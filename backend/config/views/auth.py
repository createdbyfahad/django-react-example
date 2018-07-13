from rest_framework import serializers, views
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')

    def create(self, validate_data):
        user = User(
            username=validate_data['username'],
            first_name=validate_data['first_name'],
            last_name=validate_data['last_name'],
            email=validate_data['email']
        )
        user.set_password(validate_data['password'])
        user.save()
        return user

class Registration(views.APIView):

    def post(self, request):
        # data = JSONParser().parse(request)
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("user is saved!")
            return JsonResponse(serializer.data, status=201)

        print(serializer.errors)
        return JsonResponse(serializer.errors, status=401)
