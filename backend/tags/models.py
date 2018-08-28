from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# from notes.models import Note

class Tag(models.Model):
    title = models.CharField(max_length=16, unique=True)
    # notes = models.ManyToManyField(Note, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.title

    def __unicode__(self):
        return self.title
