from django.urls import path, include

from .views import AllTags, Notes, PopularTags

urlpatterns = [
    path('all/', AllTags.as_view()),
    path('popular/', PopularTags.as_view()),
    path('<str:tag_title>/', Notes.as_view()),
]