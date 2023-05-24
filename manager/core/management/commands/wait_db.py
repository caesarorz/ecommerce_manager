import time
from django.core.management.base import BaseCommand
# from django.core.management import O
from  django.db import OperationalError, DatabaseError

class Command(BaseCommand):
    """"""

    def handle(self, *args, **kwargs):
        self.stdout.write('Waiting for database...')
        db_up = False
        while db_up is False:
            try:
                self.check(databases=['default'])
                db_up = True
            except (OperationalError, DatabaseError):
                self.stdout.write('Database unavailable, wait 1 second...')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database available'))