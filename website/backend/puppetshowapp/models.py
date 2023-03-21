from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid


# TODO consider using uuid instead of md5


#################################################################
# Helper Functions
#################################################################


def user_pfp_path(instance, filename):
    return f"profiles/{instance.user_username}/{filename}"


def user_actor_path(instance, filename):
    return f"profiles/{instance.actor_base_user.user_username}/{filename}"


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
    actor_hash = models.UUIDField(default=uuid.uuid4)

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

    # # Overwrite the default save function
    # Not used, but saved for posterity
    # def save(self, *args, **kwargs):
    #     prehash_string = (
    #         str(self.actor_base_user.user_snowflake)
    #         + str(self.scene.scene_name)
    #         + str(self.pk)
    #     )
    #     hasher = md5(prehash_string, usedforsecurity=False)
    #     self.actor_hash = hasher.hexdigest()
    #     super().save(*args, **kwargs)


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


################################################################
# User Model
################################################################


class DiscordPointingUserManager(BaseUserManager):
    def create_user(self, email, password, discord_snowflake):
        if not email or not discord_snowflake:
            raise ValueError("Email and discord snowflake all must be valid.")
        discord, created = DiscordData.objects.get_or_create(
            user_snowflake=discord_snowflake
        )
        if created:
            print("Created an empty discord user for account")
            # TODO will need to also grab and sync discord information
        user = self.model(email=email, discord_data=discord)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        if not email or not password:
            raise ValueError(
                "Username, password, and discord snowflake all must be valid."
            )
        user = self.create_user(email, password, discord_snowflake="-1")
        user.is_admin = True
        user.save(using=self.db)
        return user


class DiscordPointingUser(AbstractBaseUser):
    email = models.EmailField(("email_address"), unique=True)
    discord_data = models.OneToOneField(DiscordData, on_delete=models.DO_NOTHING)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now())

    objects = DiscordPointingUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["discord_data"]

    def __str__(self) -> str:
        if self.discord_data.user_username is None:
            return self.email
        return self.discord_data.user_username

    def has_perm(self, perm, obj=None):
        if self.is_staff:
            return True
        elif isinstance(obj, Actor):
            if obj.actor_base_user.pk == self.discord_data.pk:
                return True
            return False
        elif isinstance(obj, Scene):
            if obj.scene_author.pk == self.discord_data.pk:
                return True
            return False
        return False
        # TODO finish perms, is this all that we need?
        # return super().has_perm(perm, obj)
