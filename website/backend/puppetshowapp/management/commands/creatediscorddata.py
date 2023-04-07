from django.core.management.base import BaseCommand, CommandError
from puppetshowapp.models import DiscordPointingUser, DiscordData
from getpass import getpass


class Command(BaseCommand):
    help = "Creates Discord Data"

    def add_arguments(self, parser) -> None:
        return super().add_arguments(parser)

    def handle(self, *args, **options):
        snowflake = input("Snowflake: ")
        username = input("Username: ")
        data = DiscordData.objects.create(
            user_snowflake=snowflake, user_username=username
        )
        self.stdout.write(self.style.SUCCESS("User account created."))
