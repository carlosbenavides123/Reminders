from rest_framework import serializers

from core.models import Reminder


class ReminderSerializer(serializers.ModelSerializer):
    """Serializer for reminder object"""

    class Meta:
        model = Reminder
        fields = ('id', 'name', 'date')
        read_only_Fields = ('id',)

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return 123