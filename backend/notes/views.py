from django.shortcuts import render
from rest_framework import serializers, views
from django.contrib.auth import get_user
from .models import Note
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.fields import CurrentUserDefault
from rest_framework.decorators import api_view, permission_classes
# Create your views here.


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude = ['owner']

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

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def MakePublic(request, note_id = None):
    try:
        note = Note.objects.get(pk=note_id)
        if(note.owner != request.user):
            return Response({'error': 'User does not own the note'}, status=404)

        note.public = True
        note.save()
        return Response(status=201)
    except Note.DoesNotExist:
        return Response({'error': 'A note with provided id does note exist.'}, status=404)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def MakePrivate(request, note_id = None):
    try:
        note = Note.objects.get(pk=note_id)
        if(note.owner != request.user):
            return Response({'error': 'User does not own the note'}, status=404)

        # remove the note from the timeline model
        note.public = False
        note.save()

        # print(NotesTimeline.o)
        return Response(status=201)
    except Note.DoesNotExist:
        return Response({'error': 'A note with provided id does note exist.'}, status=404)


class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude = ['owner']

@api_view(['GET'])
def NotesTimeline(request):
    timeline = Note.timeline.all()
    serializer = NoteSerializer(timeline, many=True)
    return Response(serializer.data)
