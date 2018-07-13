from django.contrib import admin
from django.urls import path, include
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

from rest_framework import views, serializers, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.conf.urls.static import static

from django.core.exceptions import PermissionDenied

from django.conf.urls.static import static

from . import views as local_views
from .views.auth import Registration


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED)

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

class TestView(generic.GenericViewError):

    def get(self, request):
        raise PermissionDenied

    def post(self, request):
        serializer = RegisterSeializer(data =request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', generic.RedirectView.as_view(url='/api/', permanent=False)),
    path('api/', get_schema_view(title="API Monitoring")),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/register/', Registration().as_view()),
    path('api/auth/token/obtain/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/echo/', EchoView.as_view()),
    path('api/notes/', include('notes.urls'))
    # path('api/user/login/', TestView.as_view())

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
