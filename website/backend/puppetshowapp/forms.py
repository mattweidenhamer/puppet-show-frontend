from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import DiscordPointingUser


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = DiscordPointingUser
        fields = ("email", "discord_data")


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = DiscordPointingUser
        fields = ("email", "discord_data")


# class SceneForm(forms.Form):
