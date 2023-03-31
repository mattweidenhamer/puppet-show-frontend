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
        read_only_field = ["actor_hash", "actor_base_user", "scene"]


class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = (
            "scene_author",
            "scene_name",
        )
        read_only_field = ["scene_author"]


class DiscordDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscordData
        fields = ["user_snowflake", "user_username", "profile_picture"]
        read_only_field = ["user_snowflake"]


class UserSerializer(serializers.ModelSerializer):
    scenes = serializers.PrimaryKeyRelatedField(many=True, queryset=Scene.objects.all())

    class Meta:
        model = DiscordPointingUser
        fields = ["id", "email", "created", "updated", "scenes", "discord_data"]
        read_only_field = ["created", "updated"]
