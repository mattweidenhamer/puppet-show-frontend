from django.db import models
from .authentication_models import DiscordPointingUser
import uuid


# This model is created by DPUs are are bound to them.
# It contains an identifier, a discord snowflake, and a discord username.
# When the identifier is called in the URL, access the parent user's default scene and load this user's corresponding actor.
class Performer(models.Model):
    identifier = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    parent_user = models.ForeignKey(DiscordPointingUser, on_delete=models.CASCADE)
    discord_snowflake = models.CharField(max_length=25, unique=True)
    discord_username = models.CharField(max_length=30)

    @property
    def get_outfit(self):
        if self.parent_user.active_scene is None:
            return None
        return self.parent_user.active_scene.outfits.filter(performer=self).first()

    @property
    def get_owner(self):
        return self.parent_user
