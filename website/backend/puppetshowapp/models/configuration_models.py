from django.db import models
from .data_models import Animation, DiscordData
from .authentication_models import DiscordPointingUser
from enum import Enum
from uuid import uuid4
import os
from ..constants import DEFAULT_USER_SETTINGS, DEFAULT_SCENE_SETTINGS


def user_actor_path(instance, filename):
    return f"profiles/{instance.actor_base_user.user_username}/{filename}"


# A "scene" is a configuration of a certain set of actors.
# Each has their own
class Scene(models.Model):
    scene_name = models.CharField(max_length=30)
    scene_author = models.ForeignKey(DiscordPointingUser, on_delete=models.CASCADE)
    scene_settings = models.JSONField(default=DEFAULT_SCENE_SETTINGS)
    is_active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.scene_name} scene"

    class Meta:
        db_table = "scenes"

    @property
    def actors(self):
        return Actor.objects.filter(scene=self)

    def get_owner(self):
        return self.scene_author


# An "Actor" is a visualization of the user in a scene.
# It is the main representation of the screen that a user gets.
class Actor(models.Model):
    class Attributes(Enum):
        START_SPEAKING = "START_SPEAKING"
        NOT_SPEAKING = "STOP_SPEAKING"
        SLEEPING = "SLEEPING"
        CONNECTION = "CONNECTION"
        DISCONNECT = "DISCONNECTION"

    # The actor unique identifier, which is called from the URL
    identifier = models.UUIDField(default=uuid4)

    # The user actually being drawn
    actor_base_user = models.ForeignKey(DiscordData, on_delete=models.CASCADE)

    # The scene the actor is in
    scene = models.ForeignKey(Scene, on_delete=models.CASCADE)

    # A display name for the actor
    actor_name = models.CharField(max_length=30)

    # All of their animations
    animations = models.ManyToManyField(Animation, blank=True)

    # Any additional settings
    settings = models.JSONField(default=DEFAULT_USER_SETTINGS)

    class Meta:
        db_table = "charactor_actors"

    def get_owner(self):
        return self.scene.scene_author

    def has_perm(self, perm, obj=None):
        if self.is_superuser:
            return True
        elif isinstance(obj, Actor):
            if obj.scene.scene_author.pk == self.pk:
                return True
            return False
        elif isinstance(obj, Scene):
            if obj.scene_author.pk == self.pk:
                return True
            return False
        return False

    def __str__(self) -> str:
        return f"{self.actor_base_user} {self.scene.scene_name}"

    def save(self, *args, **kwargs):
        if self.actor_name is None or self.actor_name == "":
            self.actor_name = self.actor_base_user.user_username
        super().save(*args, **kwargs)

    def setImage(self, attribute, image):
        def _deleteImage(image):
            try:
                if os.path.isfile(image.path):
                    os.remove(image.path)
            except ValueError:
                pass

        # If there's already an animation for it in the file, overwrite it.
        for animation in self.animations.all():
            if animation.animation_type == attribute:
                _deleteImage(animation.animation_image)
                animation.animation_image = image
                animation.save()
                return

        # Otherwise, create a new one and add it.
        self.animations.create(animation_type=attribute, animation_image=image)


# An "emotion" is an extra configuration of states.
# Eventually, a user from another portion of the site should be able to push a button
# that changes their emotion on the website.

# NYI


# class Emotion(models.Model):
#     # A unique hash of the person's ID, the emotion name,
#     emotion_hash = models.CharField(max_length=200)

#     # The emotion "name," default to "Neutral"
#     emotion_name = models.CharField(max_length=15, default="Neutral")

#     # What actor they belong to
#     actor = models.ForeignKey(Actor, on_delete=models.CASCADE)

#     # Default animations
#     speaking_animation = models.ImageField(upload_to=user_actor_path)
#     not_speaking_animation = models.ImageField(upload_to=user_actor_path)

#     # When not speaking for a while, NYI
#     sleeping_animation = models.ImageField(upload_to=user_actor_path)

#     # NYI
#     connection_animation = models.ImageField(upload_to=user_actor_path)
#     disconnect_animation = models.ImageField(upload_to=user_actor_path)

#     class Meta:
#         db_table = "character_emotions"
