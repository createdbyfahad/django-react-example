from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
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