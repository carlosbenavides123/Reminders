from django.urls import path, include
from rest_framework.routers import DefaultRouter

from reminder import views


router = DefaultRouter()
router.register('reminders', views.ReminderViewSet)

app_name = 'reminder'

urlpatterns = [
    path('', include(router.urls))
]