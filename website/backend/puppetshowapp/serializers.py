from rest_framework import serializers
from .models import Actor, Scene, DiscordPointingUser, DiscordData


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = (
            "actor_hash",
            "actor_base_user",
            "scene",
            "speaking_animation",
            "not_speaking_animation",
            # TODO Uncomment after implemented
            # "sleeping_animation",
            # "connection_animation",
            # "disconnect_animation",
        )


class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = (
            "scene_author",
            "scene_name",
        )


class DiscordDataSerializer(serializers.ModelSerializer):
    model = DiscordData
    fields = ["user_snowflake", "user_username", "profile_picture"]


class UserSerializer(serializers.ModelSerializer):
    model = DiscordPointingUser
    fields = ["id", "email", "created", "updated"]
    read_only_field = ["created", "updated"]
