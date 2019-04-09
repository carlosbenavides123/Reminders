from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from core.models import Reminder
from django.http import HttpResponse,request

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

import requests

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
        self.schedule_task(self.request.data)

    def schedule_task(self, data):
        print(data['time'])
        time = self.time_swap(data['time'])
        date = self.day_swap(data['date'])
        scheduler.add_job(self.job_function, 'cron', year=date[0], month=date[1], day=date[2], hour=time[0], minute=time[1], timezone=timezone('US/Pacific'),kwargs={'text':data['name']})

    def job_function(self, text):
        apikey = "key=AAAAKtQGGKU:APA91bHgA0AjGOwTIborASxPY_FOES0S33sR0dv3JNpfRdi6YKu58O485XEIoL3Ibrgx7MUjYWtZFub2cxa-tlv9N8M8KJv-IewF4fzNAGAY8WX5tcpfbX5QOBOUlKHObb38qvjuMRah"
        headers = {
            "content-type": "application/json", 
            "Authorization": apikey
       }

        payload = {  
                    "to": "cDGl0w_Qv9k:APA91bH5XxTOSc2Sb1w4AJ54e6yWKF4SMTHJSU3i_yG_xZ3rbI_xjSxDYkknBZcqsaCWCaObaqmRBlZmClEn7VeE0XH4bIaZnQx8RRuSKN22A_thY4iV8dY8s5VtJNV6mfgwbQ6-zw4K",
                    "priority": "high",
                    "notification" : {
                        "body": "Reminder!",
                        "title" : text,
                        "click_action":"FCM_PLUGIN_ACTIVITY"
                    }
                }

        print(text)
        print(json.dumps(payload))
        print(headers)
        r = requests.post('https://fcm.googleapis.com/fcm/send', data=json.dumps(payload), headers=headers)
        print(r)
        print(r.status_code)

    def perform_update(self, serializer):
        """Create a new ingredient"""
        serializers.save(user=self.request.user)

    def time_swap(self, time):
        if time == "Morning":
            return [8, 0, 0]
        elif time == "Afternoon":
            return [12, 0]
        elif time == "Evening":
            return [16, 0]
        else:
            return time.split(':')

    def day_swap(self, date):
        if date == "Today":
            today = datetime.datetime.today()
            return [today.year, today.month, today.day]
        elif date == "Tomorrow":
            today = datetime.datetime.today() + datetime.timedelta(days=1)
            return [today.year, today.month, today.day]
        else:
            return date.split(',')

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
    scheduler.add_job(resume, trigger='cron', second='*/5')
def resume():    
    scheduler.resume()
    scheduler.add_job(pause, trigger='cron', second='*/5')