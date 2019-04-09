from django.urls import path, include
from rest_framework.routers import DefaultRouter

from reminder import views

# from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet

app_name = 'reminder'
router = DefaultRouter()

router.register('reminder', views.ReminderViewSet)
# router.register(r'devices', FCMDeviceAuthorizedViewSet)

urlpatterns = [
    path('', include(router.urls))
]