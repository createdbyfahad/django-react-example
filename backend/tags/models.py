from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models import Avg, Count
# from notes.models import Note

class TagManager(models.Manager):
    def popular(self, count):
        return super().get_queryset().annotate(num_notes=Count('note')).order_by('-num_notes')[:count]


class Tag(models.Model):
    title = models.CharField(max_length=16, unique=True)
    # notes = models.ManyToManyField(Note, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    objects = TagManager()

    def __str__(self):
        return self.title

    def __unicode__(self):
        return self.title
