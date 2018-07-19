from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.humanize.templatetags.humanize import naturaltime
import datetime
# Create your models here.

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return datetime.datetime.now()

class TimelineManage(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(public=True)

class Note(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)
    title = models.CharField(max_length=64, default="No Title")
    body = models.TextField(default="")
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(default=timezone.now)

    objects = models.Manager()
    timeline = TimelineManage()

    def __str__(self):
        return self.title

    @property
    def humanize_created_at(self):
        return naturaltime(self.updated_at)

    @property
    def votes(self):
        upvotes_count = NoteVote.objects.filter(note=self.id, like=True).count()
        downvotes_count = NoteVote.objects.filter(note=self.id, like=False).count()
        return (upvotes_count, downvotes_count)


class NoteVote(models.Model):
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    like = models.BooleanField(default=True) # true = liked (upvoted), false = disliked (downvoted)

    def __str__(self):
        return self.owner.username + "  voted " + str(self.like)
