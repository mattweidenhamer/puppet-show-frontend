from django.test import TestCase
from django.urls import reverse
from rest_framework.test import (
    APIRequestFactory,
    APIClient,
    APITestCase,
    force_authenticate,
)

from ..models.authentication_models import DiscordPointingUser
from ..models.configuration_models import Scene, Actor
from ..models.data_models import DiscordData


class TokenExchangeTestCase(APITestCase):
    def setUp(self):
        pass

    # Test that when sending a user token to the endpoint, it authenticates via discord and returns a token.
    def test_token_exchange_existing(self):
        pass

    # Same as the above test, but the user doesn't exist in the database and should be created.
    def test_token_withuser(self):
        pass

    # Test that the endpoint returns a 400 error if the token is invalid or expired.
    def test_token_invalid(self):
        pass


class SceneEndpointTestCase(APITestCase):
    def setUp(self):
        user_data_1 = DiscordData.objects.create(
            user_snowflake="1234567890", user_username="testuser"
        )
        user_data_2 = DiscordData.objects.create(
            user_snowflake="09876543210", user_username="testuser_2"
        )

        normal_user_1 = DiscordPointingUser.objects.create(
            discord_data=user_data_1, password="test"
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            discord_data=user_data_2, password="test_2"
        )

        scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )
        scene_2 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene_2"
        )

        Actor.objects.create(
            actor_base_user=user_data_1, actor_name="test_actor", scene=scene_1
        )
        Actor.objects.create(
            actor_base_user=user_data_2, actor_name="test_actor_2", scene=scene_1
        )
        Actor.objects.create(
            actor_base_user=user_data_2, actor_name="test_actor_3", scene=scene_2
        )

    # Test that users can create a scene, and that the scene has the correct properties.
    def test_create_scene(self):
        pass

    # Make sure that a user can't access, edit, or delete another user's scene
    def test_get_scene_for_other_user(self):
        # user_1 = DiscordPointingUser.objects.get(
        #     discord_data__user_snowflake="1234567890"
        # )
        # factory = APIRequestFactory()
        # request = factory.get("/scenes/1/")
        # force_authenticate(request, user=user_1)
        pass

    # Make sure that a user can access, modify, and delete their own scene
    def test_view_scene_for_self(self):
        user_1 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="1234567890"
        )
        scene_1 = Scene.objects.filter(scene_author=user_1).first()
        url = reverse("scene-detail", args=[scene_1.id])
        client = APIClient()
        client.force_authenticate(user=user_1)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.body, "test_scene")

    # Make sure that a user can access a list of all of their scenes
    def test_retrieve_scene_list(self):
        pass

    # Make sure that the scene returned includes all the actors in the scene as objects.


class ActorEndpointTestCase(APITestCase):
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

    # Test that a user can create an actor, and that the actor has the correct properties.
    def test_create_actor(self):
        pass

    # Make sure that a user can't access, edit, or delete another user's actor
    def test_get_actor_for_other_user(self):
        pass

    # Make sure that a user can access their own actor
    def test_get_actor_for_self(self):
        pass

    # Make sure that a user can edit their actor
    def test_edit_actor(self):
        pass

    # Make sure that anyone can retrieve the actor's specific information via the ActorDetailReadOnly view
    def test_actor_stage(self):
        pass


class DiscordDataEndpointTestCase(APITestCase):
    # Validate that a user's request can create, access, and delete a DiscordData object.
    pass
