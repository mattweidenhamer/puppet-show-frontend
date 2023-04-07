from django.test import TestCase
from ..models import Scene, DiscordPointingUser, DiscordData

# Test the API endpoints


class SceneEndpointTestCase(TestCase):
    # TODO will need to be rebuilt if we start using tokens
    def setUp(self):
        user_data_1 = DiscordData.objects.create(
            user_snowflake="1234567890", user_username="testuser"
        )
        user_data_2 = DiscordData.objects.create(
            user_snowflake="09876543210", user_username="testuser_2"
        )
        superuser_data = DiscordData.objects.create(
            user_snowflake="0987654321", user_username="testuser_super"
        )
        normal_user_1 = DiscordPointingUser.objects.create(
            email="test_email_1@gmail.com", discord_data=user_data_1, password="test"
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            email="test_email_2@gmail.com", discord_data=user_data_2, password="test_2"
        )
        superuser_1 = DiscordPointingUser.objects.create_superuser(
            password="test_super",
            discord_data=superuser_data,
        )

        scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )

    def test_create_scene(self):
        # Test that users can create a scene.
        pass

    def test_create_scene_for_other_user(self):
        # Test that users can't create a scene for another user.
        pass

    # Make sure that a user can't access another user's scene
    def test_get_scene_for_other_user(self):
        # Make sure a user can't access another user's scene.
        pass


class ActorEndpointTestCase(TestCase):
    def setUp(self):
        user_data_1 = DiscordData.objects.create(
            user_snowflake="1234567890", user_username="testuser"
        )
        user_data_2 = DiscordData.objects.create(
            user_snowflake="09876543210", user_username="testuser_2"
        )
        superuser_data = DiscordData.objects.create(
            user_snowflake="0987654321", user_username="testuser_super"
        )

        normal_user_1 = DiscordPointingUser.objects.create(
            email="test_email_1@gmail.com", discord_data=user_data_1, password="test"
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            email="test_email_2@gmail.com", discord_data=user_data_2, password="test_2"
        )
        superuser_1 = DiscordPointingUser.objects.create_superuser(
            email="test_email_3@gmail.com",
            discord_data=superuser_data,
            password="test_super",
        )
