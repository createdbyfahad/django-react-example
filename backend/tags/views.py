
from rest_framework import generics, serializers, views
from rest_framework.permissions import IsAdminUser
from .models import Tag
from notes.models import Note
from notes.views import NoteSerializer
from notes.pagination import NotesTimelinePagination
from django.http import HttpResponse, JsonResponse

# Create your views here.


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        # fields = ('id', 'account_name', 'users', 'created')
        fields = ('id', 'title')

class AllTags(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    # permission_classes = (IsAdminUser,)


class Notes(views.APIView):
    pagination_class = NotesTimelinePagination
    def get(self, request, tag_title):
        try:
            tag = Tag.objects.get(title=tag_title)
            notes = tag.note_set.all()
            serializer = NoteSerializer(notes, many=True)
            return JsonResponse(serializer.data, status=201, safe=False)
        except Tag.DoesNotExist:
            return JsonResponse({'error': 'A tag with provided title does note exist.'}, status=404)

