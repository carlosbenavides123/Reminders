from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Reminder
from django.http import HttpResponse

from reminder import serializers

import json

class ReminderViewSet(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin):
    """Manage reminders in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Reminder.objects.all()
    serializer_class = serializers.ReminderSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def perform_create(self, serializer):
        """ Create a new reminder"""
        serializer.save(user=self.request.user)

    # def perform_update(self, serializer):
    #     """Create a new ingredient"""
    #     serializers.save(user=self.request.user)