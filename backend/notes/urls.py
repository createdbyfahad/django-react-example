from django.urls import path, include
from .views import Notes, AllNotes, MakePublic, MakePrivate, NotesTimeline


urlpatterns = [
    path('add/', Notes.as_view()),
    path('', AllNotes.as_view()),
    path('<int:note_id>/makePublic', MakePublic),
    path('<int:note_id>/makePrivate', MakePrivate),
    path('timeline/', NotesTimeline)
]