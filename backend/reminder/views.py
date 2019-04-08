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

import time as time_module
from datetime import datetime
from datetime import timedelta

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

from pytz import timezone
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.schedulers.background import BackgroundScheduler
import os, time

sched = BlockingScheduler()

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
        scheduler.add_job(self.job_function, 'cron', month=4, day=7, hour=21, minute=12, timezone=timezone('US/Pacific'))

    def job_function(self):
        print("dasds")

    def perform_update(self, serializer):
        """Create a new ingredient"""
        serializers.save(user=self.request.user)

def tick(text):
    print(text + '! The time is: %s' % datetime.now())


scheduler = BackgroundScheduler()
dd = datetime.now() + timedelta(seconds=3)
scheduler.add_job(tick, 'date',run_date=dd, args=['TICK'])

dd = datetime.now() + timedelta(seconds=6)
scheduler.add_job(tick, 'date',run_date=dd, kwargs={'text':'TOCK'})

scheduler.start()
print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

def pause():
    scheduler.pause()
    print("PAUSE")
    scheduler.add_job(resume, trigger='cron', second='*/5')
def resume():    
    scheduler.resume()
    print(RESUME)
    scheduler.add_job(pause, trigger='cron', second='*/5')