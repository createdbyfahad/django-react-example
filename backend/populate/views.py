from django.shortcuts import render
from django.http import HttpResponse
import datetime
from notes.models import (Note, NoteVote)
from django.contrib.auth.models import User
from faker import Faker
import random
from django.http import JsonResponse

# Create your views here.

DEFAULT_PASSWORD = 123456

def current_datetime(request, total):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

def populate_users(request, total):
    failed_attempts = 0
    fake = Faker()
    for i in range(total):
        profile = fake.simple_profile()
        print(profile)
        deconstructed_name = profile['name'].split()
        try:
            user = User.objects.create_user(
                profile['username'], profile['mail'],
                DEFAULT_PASSWORD, first_name=deconstructed_name[0], last_name=deconstructed_name[1])
            print(user)
        except:
            failed_attempts += 1

    return JsonResponse({"failed_attempts: ": failed_attempts})

def populate_notes(request, total):
    # go over all users and add a total of 'total' notes per each user
    users = User.objects.all()
    failed_attempts = 0
    fake = Faker()
    for user in users:
        for i in range(total):
            try:
                user.note_set.create(title=fake.text(max_nb_chars=32, ext_word_list=None),
                                     body=fake.paragraph(nb_sentences=4, variable_nb_sentences=True,
                                                         ext_word_list=None),
                                     public=random.random() > 0.5)
            except:
                failed_attempts += 1

    return HttpResponse("failed_attempts: " + str(failed_attempts))

def populate_votes(request, percent_likes):
    if percent_likes < 1 or percent_likes > 100:
        return JsonResponse({"error": "Percent likes has to be between 1 and 100"})

    users = User.objects.all()
    all_notes = list(Note.objects.all())
    failed_attempts = 0
    counter = 0
    # first delete all votes
    NoteVote.objects.all().delete()
    for user in users:
        for note in all_notes:
            likes = random.random() < (percent_likes / 100)
            try:
                note.notevote_set.create(
                    owner=user, like=likes
                )
                counter += 1
            except:
                failed_attempts += 1

    return JsonResponse({"failed_attempts: ": failed_attempts, "counter": counter})

