from django.core.management.base import BaseCommand, CommandError
from puppetshowapp.models import DiscordPointingUser


# TODO delete before live
class Command(BaseCommand):
    help = "View all users"

    def handle(self, *args, **options):
        accounts = DiscordPointingUser.objects.all()
        for obj in accounts:
            print("")
            print(f"Email: {obj.email}")
            print(f"Password: {obj.password}")
            print(f"is_staff: {obj.is_staff}")
            print(f"is_admin:  {obj.is_admin}")
