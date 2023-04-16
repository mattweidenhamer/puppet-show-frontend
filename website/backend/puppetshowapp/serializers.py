from rest_framework import serializers
from .models.configuration_models import Outfit, Scene
from .models.authentication_models import DiscordPointingUser
from .models.data_models import DiscordData, Animation
from .models.new_models import Performer


class DiscordDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscordData
        fields = ("user_snowflake", "user_username", "profile_picture")
        read_only_field = ["user_username", "profile_picture"]


class AnimationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animation
        fields = ("animation_type", "animation_image")
        read_only_field = ["animation_type"]


class ActorSerializer(serializers.ModelSerializer):
    animations = AnimationSerializer(many=True, required=False)
    actor_base_user = DiscordDataSerializer(read_only=True)
    actor_base_user_id = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Outfit
        fields = (
            "actor_name",
            "identifier",
            "actor_base_user",
            "scene",
            "animations",
            "actor_base_user_id",
            "settings",
        )
        read_only_field = ["identifier", "actor_base_user", "scene"]

        extra_kwargs = {
            "scene": {"required": False},
            "actor_base_user": {"required": False},
        }

    def create(self, validated_data):
        if "animations" not in validated_data:
            validated_data["animations"] = []
        animations = validated_data.pop("animations")
        if "actor_base_user_id" not in validated_data:
            # Raise a 400 error
            raise serializers.ValidationError(
                "actor_base_user_id is required to create an actor"
            )
        actor_base_user_id = validated_data.pop("actor_base_user_id")
        actor_base_user, created = DiscordData.objects.get_or_create(
            user_snowflake=actor_base_user_id
        )
        validated_data["actor_base_user"] = actor_base_user
        actor = Outfit.objects.create(**validated_data)
        for animation in animations:
            actor.Animation.objects.create(actor=actor, **animation)
        return actor


# class ActorSerializerStage(serializers.ModelSerializer):
#     animations = AnimationSerializer(many=True, required=False)
#     baseUser = serializers.ReadOnlyField(source="actor_base_user.user_snowflake")

#     class Meta:
#         model = Outfit
#         fields = (
#             "actor_name",
#             "identifier",
#             "settings",
#             "animations",
#             "baseUser",
#             "settings",
#         )
#         read_only_field = [
#             "actor_name",
#             "animations",
#             "baseUser",
#             "identifier",
#             "settings",
#         ]


class SceneSerializer(serializers.ModelSerializer):
    actors = ActorSerializer(many=True, required=False)

    class Meta:
        model = Scene
        fields = (
            "scene_name",
            "scene_settings",
            "is_active",
            "actors",
        )
        read_only_field = ["scene_author"]


class UserSerializer(serializers.ModelSerializer):
    discord_data = DiscordDataSerializer()
    scenes = SceneSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = DiscordPointingUser
        fields = ["uuid", "scenes", "discord_data", "active_scene", "added_users"]
        read_only_field = ["created", "uuid"]


class PerformerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Performer
        fields = ("identifier", "discord_snowflake", "discord_username")
        read_only_field = ["identifier", "discord_username"]
