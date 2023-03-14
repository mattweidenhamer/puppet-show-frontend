from django.core.files.storage import FileSystemStorage
from django.db import models
from random import randint
from hashlib import md5


#################################################################
# Helper Functions
#################################################################


def user_pfp_path(instance, filename):
    return f"profiles/{instance.user_username}/{filename}"


def user_actor_path(instance, filename):
    return f"profiles/{instance.actor_base_user.user_username}/{filename}"


def generate_user_hash():
    pass


#################################################################
# Models
#################################################################


# The user's snowflake, Discord Name, and any other neccesary parts
class DiscordData(models.Model):
    user_snowflake = models.CharField(max_length=20, unique=True)
    user_username = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to=user_pfp_path)

    def __str__(self) -> str:
        return str(self.user_username)

    class Meta:
        db_table = "discord_user_data"


# A "scene" is a configuration of a certain set of actors.
# Each has their own
class Scene(models.Model):
    scene_author = models.ForeignKey(DiscordData, on_delete=models.CASCADE)
    scene_name = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f"{self.scene_author} {self.scene_name} scene"

    # Include any further needed names for configuration

    class Meta:
        db_table = "scenes"


# An "Actor" is a visualization of the user in a scene.
# It is the main representation of the screen that a user gets.
class Actor(models.Model):
    # TODO set up so that it deletes images that are currently being unused
    # A unique hash of the person's ID, the emotion name,
    actor_hash = models.CharField(
        max_length=200, unique=True, default=randint(-99999, 99999)
    )

    # The ID of the user actually being drawn
    actor_base_user = models.ForeignKey(DiscordData, on_delete=models.CASCADE)

    # What Scene they belong to
    scene = models.ForeignKey(Scene, on_delete=models.CASCADE)

    # Default animations
    speaking_animation = models.ImageField(upload_to=user_actor_path)
    not_speaking_animation = models.ImageField(upload_to=user_actor_path)

    # When not speaking for a while, NYI
    sleeping_animation = models.ImageField(null=True, blank=True)

    # NYI
    connection_animation = models.ImageField(null=True, blank=True)
    disconnect_animation = models.ImageField(null=True, blank=True)

    class Meta:
        db_table = "charactor_actors"

    def __str__(self) -> str:
        return f"{self.actor_base_user} {self.scene.scene_name}"

    # Overwrite the default save function
    def save(self, *args, **kwargs):
        prehash_string = (
            str(self.actor_base_user.user_snowflake)
            + str(self.scene.scene_name)
            + str(self.pk)
        )
        hasher = md5(prehash_string, usedforsecurity=False)
        self.actor_hash = hasher.hexdigest()
        super().save(*args, **kwargs)


# An "emotion" is an extra configuration of states.
# Eventually, a user from another portion of the site should be able to push a button
# that changes their emotion on the website.

# NYI


class Emotion(models.Model):
    # A unique hash of the person's ID, the emotion name,
    emotion_hash = models.CharField(max_length=200)

    # The emotion "name," default to "Neutral"
    emotion_name = models.CharField(
        max_length=15, default="Neutral", null=True, blank=True
    )

    # What actor they belong to
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)

    # Default animations
    speaking_animation = models.ImageField(upload_to=user_pfp_path)
    not_speaking_animation = models.ImageField(upload_to=user_pfp_path)

    # When not speaking for a while, NYI
    sleeping_animation = models.ImageField(null=True, blank=True)

    # NYI
    connection_animation = models.ImageField(null=True, blank=True)
    disconnect_animation = models.ImageField(null=True, blank=True)

    class Meta:
        db_table = "character_emotions"
