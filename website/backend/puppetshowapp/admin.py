from django.contrib import admin

from .models import DiscordData, Scene, Actor


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
