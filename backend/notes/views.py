from django.shortcuts import render
from rest_framework import serializers, views
from django.contrib.auth import get_user
from .models import Note
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.fields import CurrentUserDefault
# Create your views here.


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude = ['owner']

class Notes(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # print(request.data)
        serializer = NotesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=401)

class AllNotes(views.APIView):

    def get(self, request):
        notes = request.user.note_set.all()
        serializer = NotesSerializer(notes, many=True)
        return JsonResponse(serializer.data, status=201, safe=False)
