from rest_framework import serializers
from .models.configuration_models import Outfit, Scene
from .models.authentication_models import DiscordPointingUser
from .models.data_models import Animation
from .models.new_models import Performer


# class DiscordDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DiscordData
#         fields = ("user_snowflake", "user_username", "profile_picture")
#         read_only_field = ["user_username", "profile_picture"]


class AnimationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animation
        fields = ("animation_type", "animation_path")
        read_only_fields = ["animation_type"]


class OutfitSerializer(serializers.ModelSerializer):
    animations = AnimationSerializer(many=True, required=False)
    performer_id = serializers.CharField(write_only=True)

    class Meta:
        model = Outfit
        fields = (
            "performer",
            "outfit_name",
            "animations",
            "scene",
            "settings",
            "performer_id",
            "identifier",
        )
        read_only_fields = ["performer", "scene"]

        extra_kwargs = {
            "scene": {"required": False},
            "performer": {"required": False},
        }

    def create(self, validated_data):
        if "animations" not in validated_data:
            validated_data["animations"] = []
        animations = validated_data.pop("animations")
        if "performer_id" not in validated_data:
            raise serializers.ValidationError(
                f"performer_id is required to create an outfit, provided data was {validated_data}"
            )
        performer_id_clean = validated_data.pop("performer_id")
        try:
            performer = Performer.objects.get(identifier=performer_id_clean)
        except Performer.DoesNotExist:
            raise serializers.ValidationError(
                f"performer_id {performer_id_clean} does not exist and needs to be added first."
            )
        validated_data["performer"] = performer
        outfit = Outfit.objects.create(**validated_data)
        for animation in animations:
            outfit.animations.objects.create(**animation)
        return outfit


class OutfitSerializerNoScene(OutfitSerializer):
    class Meta:
        model = Outfit
        fields = (
            "performer",
            "outfit_name",
            "animations",
            "settings",
            "performer_id",
        )
        read_only_fields = ["performer"]

        extra_kwargs = {
            "performer": {"required": False},
        }


class OutfitSerializerForPerformer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = (
            "outfit_name",
            "animations",
            "settings",
        )
        read_only_fields = ["outfit_name", "animations", "settings"]


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
    outfits = OutfitSerializerNoScene(many=True, required=False)

    class Meta:
        model = Scene
        fields = (
            "scene_name",
            "scene_settings",
            "is_active",
            "preview_image",
            "outfits",
            "identifier",
        )
        read_only_fields = ["scene_author", "is_active", "preview_image"]


class PerformerSerializer(serializers.ModelSerializer):
    parent_user_snowflake = serializers.CharField(
        source="parent_user.discord_snowflake", read_only=True
    )

    class Meta:
        model = Performer
        fields = (
            "identifier",
            "discord_snowflake",
            "discord_username",
            "parent_user_snowflake",
            "discord_avatar",
            "settings",
        )
        read_only_fields = ["identifier", "discord_username", "discord_avatar"]

    def create(self, validated_data):
        new_performer = super().create(validated_data)
        new_performer.request_update_user_info()
        return new_performer


class PerformanceSerializer(serializers.ModelSerializer):
    get_outfit = OutfitSerializerForPerformer(read_only=True)

    class Meta:
        model = Performer
        fields = (
            "identifier",
            "discord_snowflake",
            "discord_avatar",
            "get_outfit",
            "settings",
        )
        read_only_fields = [
            "identifier",
            "discord_username",
            "discord_avatar",
            "get_outfit",
            "settings",
        ]


# TODO: Considier making this more succinct so tha the user's active scene isn't called twice.
class UserSerializer(serializers.ModelSerializer):
    scenes = SceneSerializer(many=True, required=False, read_only=True)
    performers = PerformerSerializer(many=True, required=False, read_only=True)
    active_scene = SceneSerializer(required=False, read_only=True)

    class Meta:
        model = DiscordPointingUser
        fields = [
            "uuid",
            "discord_snowflake",
            "discord_username",
            "scenes",
            "active_scene",
            "performers",
            "discord_avatar",
            "added_performers_count",
        ]
        read_only_fields = ["uuid", "discord_snowflake", "added_performer_count"]
