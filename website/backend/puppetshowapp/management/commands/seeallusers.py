from django.core.management.base import BaseCommand, CommandError
from puppetshowapp.models import DiscordPointingUser


# TODO delete before live
class Command(BaseCommand):
    help = "View all users"

    def handle(self, *args, **options):
        accounts = DiscordPointingUser.objects.all()
        for obj in accounts:
            print(obj.discord_snowflake)
            print(obj.discord_username)
            print(obj.discord_avatar)
            print(obj.discord_auth_token)
            print(obj.discord_refresh_token)
