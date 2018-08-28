from django.contrib import admin
from .models import Note, NoteVote

# Register your models here.
admin.site.register(Note)
admin.site.register(NoteVote)