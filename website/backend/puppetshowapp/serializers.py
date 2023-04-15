from rest_framework import serializers
from .models.configuration_models import Actor, Scene
from .models.authentication_models import DiscordPointingUser
from .models.data_models import DiscordData, Animation


class AnimationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animation
        fields = ("animation_type", "animation_image")
        read_only_field = ["animation_type"]


class ActorSerializer(serializers.ModelSerializer):
    animations = AnimationSerializer(many=True, required=False)
    scene_author = serializers.ReadOnlyField(
        source="scene.scene_author.discord_data.user_username"
    )

    class Meta:
        model = Actor
        fields = ("actor_hash", "actor_base_user", "scene", "animations")
        read_only_field = ["actor_hash", "actor_base_user", "scene"]


class ActorSerializerStage(serializers.ModelSerializer):
    animations = AnimationSerializer(many=True, required=False)
    baseUser = serializers.ReadOnlyField(source="actor_base_user.user_snowflake")

    class Meta:
        model = Actor
        read_only_field = ["animations", "baseUser"]


class SceneSerializer(serializers.ModelSerializer):
    actors = serializers.PrimaryKeyRelatedField(many=True, queryset=Actor.objects.all())

    class Meta:
        model = Scene
        fields = ("scene_name", "scene_settings", "is_active", "actors",)
        read_only_field = ["scene_author"]

    def perform_create(self, serializer):
        serializer.save(scene_author=self.request.user)


class DiscordDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscordData
        fields = ["user_snowflake", "user_username", "profile_picture"]
        read_only_field = ["user_snowflake"]


class UserSerializer(serializers.ModelSerializer):
    scenes = serializers.PrimaryKeyRelatedField(many=True, queryset=Scene.objects.all())
    discord_data = DiscordDataSerializer()

    class Meta:
        model = DiscordPointingUser
        fields = ["uuid", "scenes", "discord_data", "active_scene", "added_users"]
        read_only_field = ["created", "updated"]
