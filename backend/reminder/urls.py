from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

app_name = 'reminder'

urlpatterns = [
    path('create/', views.ReminderViewSet.as_view({'post': 'create'}), name='create')
]