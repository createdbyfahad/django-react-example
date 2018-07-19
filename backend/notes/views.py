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
# Create your views here.

def votesToJson(votes):
    return {
        'upvotes': votes[0],
        'downvotes': votes[1]
    }

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    humanize_created_at = serializers.SerializerMethodField()
    votes = serializers.SerializerMethodField()
    class Meta:
        model = Note
        fields = '__all__'

    def get_humanize_created_at(self, obj):
        return obj.humanize_created_at

    def get_votes(self, obj):
        upvotes, downvotes = obj.votes
        return votesToJson(obj.votes)

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

    def get(self, request):
        notes = request.user.note_set.all()
        serializer = NoteSerializer(notes, many=True)
        return JsonResponse(serializer.data, status=201, safe=False)

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
