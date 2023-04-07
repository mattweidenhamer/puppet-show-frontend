from django.test import TestCase
from ..views import SceneList
from ..models import Actor, Scene, DiscordPointingUser, DiscordData
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient

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
            email="test_email_3@gmail.com",
            discord_data=superuser_data,
            password="test_super",
        )

        scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )

    def test_create_scene(self):
        factory = APIRequestFactory()
        user_1 = DiscordPointingUser.objects.get(email="test_email_1@gmail.com")
        request = factory.post(
            "/ps/actors/", {"scene_author": user_1.pk, "scene_name": "test_scene_2"}
        )
        client = APIClient()
        force_authenticate(request, user=user_1)
        view = SceneList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201)

    # Make sure that a user can't create a scene for another user
    def test_create_scene_for_other_user(self):
        factory = APIRequestFactory()
        user_1 = DiscordPointingUser.objects.get(email="test_email_1@gmail.com")

    # Make sure that a user can't access another user's scene
    def test_get_scene_for_other_user(self):
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
