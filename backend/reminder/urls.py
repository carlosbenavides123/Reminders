from django.urls import path, include
from rest_framework.routers import DefaultRouter

from reminder import views

app_name = 'reminder'
router = DefaultRouter()
router.register('reminder', views.ReminderViewSet)

urlpatterns = [
    path('', include(router.urls))
]