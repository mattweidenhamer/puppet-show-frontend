from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid
from .data_models import DiscordData
import logging


class DiscordPointingUserManager(BaseUserManager):
    # def create_user_from_snowflake(self, password, discord_snowflake):
    #     if not discord_snowflake:
    #         raise ValueError("Email and discord snowflake must be passed.")
    #     discord, created = DiscordData.objects.get_or_create(
    #         user_snowflake=discord_snowflake
    #     )
    #     if created:
    #         logging.info("Created an empty discord user for account")
    #         # TODO will need to also grab and sync discord information
    #     user = self.model(discord_data=discord)
    #     user.set_password(password)
    #     user.save()
    #     return user

    # def create_superuser_from_snowflake(self, password, discord_snowflake):
    #     user = self.create_user_from_snowflake(password, discord_snowflake)
    #     user.is_superuser = True
    #     user.save()
    #     return user

    # def create_user(self, password, discord_data):

    #     user = self.model(discord_data=discord_data)
    #     user.set_password(password)
    #     user.save()
    #     return user

    # def create_superuser(self, password, discord_data):
    #     user = self.create_user(password, discord_data)
    #     user.is_superuser = True
    #     user.save()
    #     return user

    def create_user(self, *args, **kwargs):
        user = self.model(*args, **kwargs)
        user.save()
        return user

    def create_superuser(self, *args, **kwargs):
        user = self.create_user(*args, **kwargs)
        user.is_superuser = True
        user.save()
        return user


class DiscordPointingUser(AbstractBaseUser):
    # TODO add components and function neccesary for token refreshing
    login_username = models.CharField(max_length=25, unique=True)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    discord_snowflake = models.CharField(max_length=25, unique=True)

    # discord_data = models.OneToOneField(
    #     DiscordData, on_delete=models.DO_NOTHING, related_name="user_discord_data"
    # )

    is_superuser = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    # added_users = models.ManyToManyField(
    #     DiscordData, blank=True, related_name="added_users"
    # )

    discord_auth_token = models.CharField(max_length=100)
    discord_refresh_token = models.CharField(max_length=100)

    # Probably not needed
    rest_auth_token = models.CharField(max_length=100)

    objects = DiscordPointingUserManager()
    USERNAME_FIELD = "login_username"
    REQUIRED_FIELDS = ["personal_discord_data"]

    # def __str__(self) -> str:
    #     if self.discord_data.user_username is None:
    #         return self.user_id
    #     return self.discord_data.user_username

    def get_owner(self):
        return self

    def has_perm(self, perm, obj=None):
        from .configuration_models import Outfit, Scene

        if self.is_superuser:
            return True
        elif isinstance(obj, Outfit):
            if obj.scene.scene_author.pk == self.pk:
                return True
            return False
        elif isinstance(obj, Scene):
            if obj.scene_author.pk == self.pk:
                return True
            return False
        return False

    def has_module_perms(self, app_label):
        return self.is_superuser

    @property
    def is_staff(self):
        return self.is_superuser

    @property
    def scenes(self):
        from .configuration_models import Scene

        return Scene.objects.filter(scene_author=self)

    @property
    def active_scene(self):
        from .configuration_models import Scene

        return Scene.objects.filter(scene_author=self, is_active=True).first()

    @property
    def added_performers(self):
        from .new_models import Performer

        return Performer.objects.filter(parent_user=self)

    def save(self, *args, **kwargs):
        if not self.login_username:
            self.login_username = f"{self.discord_snowflake}"
        super().save(*args, **kwargs)
