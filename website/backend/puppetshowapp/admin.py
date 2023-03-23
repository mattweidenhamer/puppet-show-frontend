from django import forms
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from .models import DiscordData, Scene, Actor, DiscordPointingUser
from .forms import *


# class UserCreationForm(forms.ModelForm):
#     password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
#     password2 = forms.CharField(label="Password Confirmation")

#     class Meta:
#         model = DiscordPointingUser
#         fields = ("email", "date_of_birth")

#     def clean_password2(self):
#         password1 = self.cleaned_data.get("password1")
#         password2 = self.cleaned_data.get("password2")
#         if password1 and password2 and password1 != password2:
#             raise ValidationError("Password do not match")
#         return password2

#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.set_password(self.cleaned_data["password1"])
#         if commit:
#             user.save()
#         return user


@admin.register(DiscordPointingUser)
class CustomUserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = DiscordPointingUser
    list_display = ("email", "discord_data", "is_staff", "is_active")
    list_filter = ("email", "discord_data", "is_staff", "is_active")
    fieldsets = (
        (None, {"fields": ("email", "password", "discord_data")}),
        (
            "Permissions",
            {"fields": ("is_staff", "is_active")},
        ),
    )


@admin.register(DiscordData)
class DiscordDataAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            "Discord Info",
            {"fields": ["user_snowflake", "user_username"]},
        ),
    ]


@admin.register(Scene)
class SceneAdmin(admin.ModelAdmin):
    list_display = (
        "scene_name",
        "scene_author",
        # "view_actors_link"
    )

    # def view_actors_link(self, obj):
    #     count = obj.actor_set.count()
    #     url = (
    #         reverse("admin:puppetshowapp_actor_changelist")
    #         + "?"
    #         + urlencode({"scene__id": f"{obj.id}"})
    #     )
    #     return format_html('<a href="{}">{} Actors</a>', url, count)
    #
    # view_actors_link.short_description = "Actors"

    fieldsets = [
        (
            "Scene Information",
            {"fields": ["scene_name", "scene_author"]},
        ),
    ]


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Actor Information", {"fields": ["actor_base_user", "actor_hash", "scene"]}),
        (
            "Actor Gifs",
            {
                "fields": [
                    "speaking_animation",
                    "not_speaking_animation",
                    "sleeping_animation",
                    "connection_animation",
                    "disconnect_animation",
                ]
            },
        ),
    ]
