from django.contrib import admin
from django.urls import path, include
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from django.core.exceptions import PermissionDenied
from django.conf.urls.static import static

from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['GET'])
def perform_test(request):
    ret = {'test': 2, 'fds': 3}
    return JsonResponse(ret)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', generic.RedirectView.as_view(url='/api/', permanent=False)),
    path('api/', get_schema_view(title="API Monitoring")),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/token/obtain/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/notes/', include('notes.urls')),
    path('api/testing/', perform_test)
    # path('api/user/login/', TestView.as_view())

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
