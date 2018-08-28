from django.urls import path, include

from .views import AllTags, Notes

urlpatterns = [
    path('all/', AllTags.as_view()),
    path('<str:tag_title>/', Notes.as_view()),
]