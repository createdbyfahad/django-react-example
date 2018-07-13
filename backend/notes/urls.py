from django.urls import path, include
from .views import Notes, AllNotes


urlpatterns = [
    path('add/', Notes.as_view()),
    path('', AllNotes.as_view())
]