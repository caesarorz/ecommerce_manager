import time
from django.core.management.base import BaseCommand
# from django.core.management import O

from users.models import User
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Create a superuser'

    def handle(self, *args, **kwargs):
        user = User.objects.get(username='admin')
        if user is None:
            try:
                User.objects.create_superuser(username='admin', email='admin@example.com', password='password')
                self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
            except:
                self.stdout.write(self.style.SUCCESS('Error creating superuser'))

        self.stdout.write(self.style.SUCCESS('Superuser already exists!'))
