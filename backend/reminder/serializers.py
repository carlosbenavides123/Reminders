from rest_framework import serializers

from core.models import Reminder


class ReminderSerializer(serializers.ModelSerializer):
    """Serializer for reminder object"""

    class Meta:
        model = Reminder
        fields = ('id', 'name')
        read_only_Fields = ('id',)