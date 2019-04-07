from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Reminder
from django.http import HttpResponse

from reminder import serializers

import json
from django.db import connections
from django.db.migrations.loader import MigrationLoader

from pyfcm import FCMNotification

proxy_dict = {
          "http"  : "http://127.0.0.1",
          "https" : "http://127.0.0.1",
          "http"  : "http://10.0.2.2:8000/"
        }

push_service = FCMNotification(api_key="AAAAKtQGGKU:APA91bHgA0AjGOwTIborASxPY_FOES0S33sR0dv3JNpfRdi6YKu58O485XEIoL3Ibrgx7MUjYWtZFub2cxa-tlv9N8M8KJv-IewF4fzNAGAY8WX5tcpfbX5QOBOUlKHObb38qvjuMRah")

registration_id = "eUfZANAyou0:APA91bFMuV93RNMWnCkCnsq7LYxgj9BTk-_zlLnbqumKi-8P_AzKVVrHLE9nctUr32UyxHv1nD-VpZwspqd0YTSDF_lEe272xMwpI7NnjByv0ztyS6zGEbY2qNAJVpx9R0M70ynQmVbQ"
message_title = "Uber update"
message_body = "Hi john, your customized news for today is ready"

from fcm_django.models import FCMDevice

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
        print("TESD")
        print(registration_id)
        print(message_title)
        print(message_body)
        result = push_service.notify_single_device(registration_id=registration_id, message_title=message_title, message_body=message_body)
        print(result)

        # self.test_lol()
        # return HttpResponse("123")
        # serializer.save(user=self.request.user)

    # def test_lol(self):
    #     device = FCMDevice.objects.all().first()
    #     device.send_message("Title", "Message")

    #     print("!$#@$")

    # def perform_update(self, serializer):
    #     """Create a new ingredient"""
    #     serializers.save(user=self.request.user)