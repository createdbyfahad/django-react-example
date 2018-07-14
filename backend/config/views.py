from django.http import HttpResponse, HttpResponseNotFound
import datetime
from rest_framework import views, serializers, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


def current_datetime(request):
    now = datetime.datetime.now()
    html = '<html><body>It is now %s.</body></html>' % now

    return HttpResponseNotFound(html)


class RegisterSeializer(serializers.Serializer):
    name = serializers.CharField(max_length=64)
    email = serializers.EmailField()
    password  = serializers.CharField(max_length=16, min_length=6)

class RegisterView(views.APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        serializer = RegisterSeializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
