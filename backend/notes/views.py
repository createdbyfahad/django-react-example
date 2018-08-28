from django.shortcuts import render
from rest_framework import serializers, views
from django.contrib.auth import get_user
from .models import Note, NoteVote
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.fields import CurrentUserDefault
from rest_framework.decorators import api_view, permission_classes
from .pagination import NotesTimelinePagination
from rest_framework import generics
import json
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.http import QueryDict
from rest_framework.parsers import JSONParser
# Create your views here.

from tags.models import Tag

def votesToJson(votes):
    return {
        'upvotes': votes[0],
        'downvotes': votes[1]
    }

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['title']

    def to_representation(self, instance):
        # return the tag title
        ret = super().to_representation(instance)
        ret = ret['title']
        return ret

class TagPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, instance):
        return instance.title

    def to_internal_value(self, instance):
        try:
            decoded = json.loads(instance)
            if not isinstance(decoded, list):
                raise ValueError
        except Exception:
            raise ValidationError('Incorrect type.')

        if len(decoded) > 3:
            raise ValidationError("Incorrect amount. Expected 3 or less tags per note.")

        tags = []

        for tag_id in decoded:
            try:
                tag = Tag.objects.get(pk=tag_id)
                tags.append(tag)
            except ObjectDoesNotExist:
                raise ValidationError("Incorrect tag. It does not exist.")
        return tags

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    humanize_created_at = serializers.SerializerMethodField()
    votes = serializers.SerializerMethodField()
    tags = TagPrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())

    class Meta:
        model = Note
        fields = '__all__'

    def get_humanize_created_at(self, obj):
        return obj.humanize_created_at

    def get_votes(self, obj):
        upvotes, downvotes = obj.votes
        return votesToJson(obj.votes)

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        note = super(NoteSerializer, self).create(validated_data)
        note.tags.set(tags_data[0])
        # for tag in tags_data[0]:
        #     note.tags.add(tag)
        return note

class Notes(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # print(request.data)
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=401)

class AllNotes(views.APIView):
    pagination_class = NotesTimelinePagination
    def get(self, request):
        notes = request.user.note_set.all()
        serializer = NoteSerializer(notes, many=True)
        return JsonResponse(serializer.data, status=201, safe=False)

# class PaginatedNotes(views.APIView):
#     def get(self, request, from_date=None):
#         # notes = Note.objects.
#         return JsonResponse({'fasd':'fdsad'})

def handlePublicStatus(request, note_id, status):
    try:
        note = Note.objects.get(pk=note_id)
        if(note.owner != request.user):
            return Response({'error': 'User does not own the note'}, status=404)

        note.public = status
        note.save()
        return Response(status=201)
    except Note.DoesNotExist:
        return Response({'error': 'A note with provided id does note exist.'}, status=404)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def MakePublic(request, note_id = None):
    return handlePublicStatus(request, note_id, True)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def MakePrivate(request, note_id = None):
    return handlePublicStatus(request, note_id, False)



def handleVoteStatus(request, note_id, status):
    try:
        note = Note.objects.get(pk=note_id)
        obj, created = NoteVote.objects.update_or_create(
            owner=request.user, note=note, defaults={'like': status}
        )
        return Response(votesToJson(note.votes), status=201)
    except Note.DoesNotExist:
        return Response({'error': 'A note with provided id does note exist.'}, status=404)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def upVote(request, note_id = None):
    return handleVoteStatus(request, note_id, True)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def downVote(request, note_id = None):
    return handleVoteStatus(request, note_id, False)


@api_view(['GET'])
def NotesTimeline(request):
    timeline = Note.timeline.all()
    serializer = NoteSerializer(timeline, many=True)
    return Response(serializer.data)

class PaginatedNotes(generics.ListAPIView):
    queryset = Note.timeline.all()
    serializer_class = NoteSerializer
    pagination_class = NotesTimelinePagination
