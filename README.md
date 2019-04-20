# Reminders

https://play.google.com/store/apps/details?id=com.reminders.mobile




# For development...
### To Build

##### Frontend
Have the setup for an emulator, do npm install in mobile directory.

##### Backend
- docker-compose build
- docker-compose run app python3 manage.py migrate
- verify if it worked with docker-compose up

- to update schema -> python manage.py makemigrations <your app name>/core
- might also have to run python manage.py migrate
