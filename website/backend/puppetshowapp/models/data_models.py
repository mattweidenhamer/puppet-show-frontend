from django.db import models
from enum import Enum


def user_pfp_path(instance, filename):
    return f"profiles/{instance.user_username}/{filename}"


def user_outfit_path(instance, filename):
    return f"actors/{filename}"


# The user's snowflake, Discord Name, and any other neccesary parts
# REBUILD: unsure of the future of this model.
class DiscordData(models.Model):
    user_snowflake = models.CharField(max_length=20)
    user_username = models.CharField(max_length=100)
    user_discriminator = models.CharField(max_length=4)

    # TODO if we every start capturing profile pictures
    # To obtain: Get query cdn.discordapp.com/avatars/{user_snowflake}/user_avatar.png
    profile_picture = models.ImageField(upload_to=user_pfp_path)

    def __str__(self) -> str:
        return str(self.user_username)

    class Meta:
        db_table = "discord_user_data"


# An outfit's animation
class Animation(models.Model):
    class Attributes(models.TextChoices):
        START_SPEAKING = "START_SPEAKING"
        NOT_SPEAKING = "STOP_SPEAKING"
        SLEEPING = "SLEEPING"
        CONNECTION = "CONNECTION"
        DISCONNECT = "DISCONNECTION"

    outfit = models.ForeignKey("Outfit", on_delete=models.CASCADE)
    animation_type = models.CharField(max_length=30, choices=Attributes.choices)
    animation_path = models.URLField(max_length=200)

    def __str__(self) -> str:
        return str(f"{self.outfit}" + f"{self.animation_type}")

    class Meta:
        db_table = "animations"
