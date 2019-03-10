from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Reminder

from reminder.serializers import ReminderSerializer


REMINDER_URL = reverse('reminder:reminder-list')


# class PublicTagsApiTests(TestCase):
#     """Test the publicly available tags API"""

#     def setUp(self):
#         self.client = APIClient()

#     def test_login_required(self):
#         """Test that login required for retrieving tags"""
#         res = self.client.get(REMINDER_URL)

#         self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateReminderApiTest(TestCase):
    """Test the authorized user tags API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@londonappdev.com',
            'password'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_tags(self):
        """Test retrieving tags"""
        Reminder.objects.create(user=self.user, name='Vegan')
        Reminder.objects.create(user=self.user, name='Dessert')

        res = self.client.get(REMINDER_URL)

        reminders = Reminder.objects.all().order_by('-name')
        serializer = ReminderSerializer(reminders, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_tags_limited_to_user(self):
        """Test that tags returned are for authenticated user"""
        user2 = get_user_model().objects.create_user(
            'other@londonappdev.com',
            'testpass'
        )
        Reminder.objects.create(user=user2, name='Fruity')
        reminders = Reminder.objects.create(user=self.user, name='Comfort Food')

        res = self.client.get(REMINDER_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['name'], reminders.name)

    def test_create_tag_successful(self):
        """Test creating a new tag"""
        payload = {'name': 'Simple'}
        self.client.post(REMINDER_URL, payload)

        exists = Reminder.objects.filter(
            user=self.user,
            name=payload['name']
        ).exists()
        self.assertTrue(exists)

    def test_create_tag_invalid(self):
        """Test creating a new tag with invalid payload"""
        payload = {'name': ''}
        res = self.client.post(REMINDER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)