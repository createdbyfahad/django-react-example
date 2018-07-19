from django.urls import path, include
from .views import Notes, AllNotes, \
    MakePublic, MakePrivate, NotesTimeline, upVote, downVote


urlpatterns = [
    path('add/', Notes.as_view()),
    path('', AllNotes.as_view()),
    path('<int:note_id>/makePublic', MakePublic),
    path('<int:note_id>/makePrivate', MakePrivate),
    path('<int:note_id>/upVote', upVote),
    path('<int:note_id>/downVote', downVote),
    path('timeline/', NotesTimeline)
]