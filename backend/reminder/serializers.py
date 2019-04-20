from rest_framework import serializers

from core.models import Reminder

import time as time_module
import datetime
from datetime import datetime
from datetime import timedelta
from pytz import timezone
import pytz

class ReminderSerializer(serializers.ModelSerializer):
    """Serializer for reminder object"""

    class Meta:
        model = Reminder
        fields = ('id', 'name', 'date', 'time')
        read_only_Fields = ('id',)

    def to_internal_value(self, data):
        values = super().to_internal_value(data)
        now = datetime.utcnow() - timedelta(hours=7)
        if values['date'] == "Today":
            values['date'] = now.strftime("%B") + ", " + now.strftime("%d")
        elif values['date'] == "Tomorrow":
            now = now + timedelta(days=1)
            values['date'] = now.strftime("%B") + ", " + now.strftime("%d")
        return values