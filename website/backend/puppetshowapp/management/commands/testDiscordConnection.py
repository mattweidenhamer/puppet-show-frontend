class Command(BaseCommand):
    help = "View all users"
    secretKey = 

    def handle(self, *args, **options):
        accounts = DiscordPointingUser.objects.all()
        for obj in accounts:
            print(obj.discord_auth_token)
            print(obj.discord_refresh_token)
