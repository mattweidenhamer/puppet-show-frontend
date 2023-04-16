from django.test import TestCase
from django.urls import reverse
from rest_framework.test import (
    APIRequestFactory,
    APIClient,
    APITestCase,
    force_authenticate,
)

from ..models.authentication_models import DiscordPointingUser
from ..models.configuration_models import Scene, Outfit
from ..models.new_models import Performer
from ..constants import DEFAULT_SCENE_SETTINGS, DEFAULT_ACTOR_SETTINGS


class UserEndpointTestCase(APITestCase):
    def setUp(self):
        normal_user_1 = DiscordPointingUser.objects.create(
            discord_snowflake="1234567890",
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            discord_snowflake="09876543210",
        )

        scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )
        scene_2 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene_2"
        )

        performer_1 = Performer.objects.create(
            performer_base_user=normal_user_1,
            performer_name="test_performer",
            discord_snowflake="6969420",
        )
        performer_2 = Performer.objects.create(
            performer_base_user=normal_user_2,
            performer_name="test_performer_2",
            discord_snowflake="112345689101122",
        )

        Outfit.objects.create(
            performer=performer_1, outfit_name="test_actor", scene=scene_1
        )
        Outfit.objects.create(
            performer=performer_2, outfit_name="test_actor_2", scene=scene_1
        )
        Outfit.objects.create(
            performer=performer_1, outfit_name="test_actor_3", scene=scene_2
        )

    # Test that the user can access their own user data.
    def test_user_get(self):
        user = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="1234567890"
        )
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse("user-info")
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["discord_data"]["user_snowflake"], "1234567890")
        self.assertEqual(response.data["discord_data"]["user_username"], "testuser")
        self.assertEqual(response.data("scenes")[0]["scene_name"], "test_scene")

    # Test that the user can update their own user data.
    def test_user_update(self):
        pass

    # Test that the user can add new users to their linked Discord Data
    def test_add_discord_data(self):
        pass


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


class PerformerEndpointTestCase(APITestCase):
    def setUp(self):
        pass


class SceneEndpointTestCase(APITestCase):
    def setUp(self):
        normal_user_1 = DiscordPointingUser.objects.create(
            discord_snowflake="1234567890",
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            discord_snowflake="09876543210",
        )

        scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )
        scene_2 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene_2"
        )
        performer_1 = Performer.objects.create(
            performer_base_user=normal_user_1,
            performer_name="test_performer",
            discord_snowflake="6969420",
        )
        performer_2 = Performer.objects.create(
            performer_base_user=normal_user_2,
            performer_name="test_performer_2",
            discord_snowflake="112345689101122",
        )
        Outfit.objects.create(
            performer=performer_1, outfit_name="test_actor", scene=scene_1
        )
        Outfit.objects.create(
            performer=performer_2, outfit_name="test_actor_2", scene=scene_1
        )
        Outfit.objects.create(
            performer=performer_1, outfit_name="test_actor_3", scene=scene_2
        )

    # Test that users can create a scene, and that the scene has the correct properties.
    def test_create_scene(self):
        user_2 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="09876543210"
        )
        url = reverse("scene-list")
        client = APIClient()
        client.force_authenticate(user=user_2)
        data = {"scene_name": "test_scene_100"}
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene_100").count(), 1)
        createdScene = Scene.objects.filter(scene_name="test_scene_100").first()
        self.assertEqual(createdScene.get_owner, user_2)
        self.assertEqual(createdScene.scene_name, "test_scene_100")

    # Make sure that a user can't access, edit, or delete another user's scene
    def test_get_scene_for_other_user(self):
        user_1 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="1234567890"
        )
        user_2 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="09876543210"
        )
        scene_1 = Scene.objects.filter(scene_author=user_1).first()
        url = reverse("scene-detail", args=[scene_1.id])
        client = APIClient()
        client.force_authenticate(user=user_1)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        client.force_authenticate(user=None)
        response = client.get(url)
        self.assertEqual(response.status_code, 401)
        client.force_authenticate(user=user_2)
        response = client.get(url)
        self.assertEqual(response.status_code, 403)
        modified_data = {"scene_name": "test_scene_69"}
        response = client.put(url, modified_data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene_69").count(), 0)
        response = client.delete(url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene").count(), 1)

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
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["scene_name"], "test_scene")
        self.assertEqual(response_dict["is_active"], False)
        self.assertEqual(response_dict["scene_settings"], DEFAULT_SCENE_SETTINGS())
        self.assertEqual(len(response_dict["actors"]), 2)
        self.assertEqual(response_dict["actors"][0]["actor_name"], "test_actor")
        self.assertEqual(response_dict["actors"][1]["actor_name"], "test_actor_2")

        modified_data = {"scene_name": "test_scene_69"}
        response = client.put(url, modified_data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene_69").count(), 1)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene").count(), 0)
        response = client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene_69").count(), 0)

    # Make sure that a user can access a list of all of their scenes
    def test_retrieve_scene_list(self):
        user_1 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="1234567890"
        )
        url = reverse("scene-list")
        client = APIClient()
        client.force_authenticate(user=user_1)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(len(response_dict), 2)
        self.assertEqual(response_dict[0]["scene_name"], "test_scene")
        self.assertEqual(response_dict[1]["scene_name"], "test_scene_2")
        user_2 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="09876543210"
        )
        client.force_authenticate(user=user_2)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(len(response_dict), 0)
        client.force_authenticate(user=None)
        response = client.get(url)
        self.assertEqual(response.status_code, 401)


# TODO rewrite, this should need a lot less code with the new functions.
class ActorEndpointTestCase(APITestCase):
    def setUp(self):
        normal_user_1 = DiscordPointingUser.objects.create(
            discord_snowflake="1234567890"
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            discord_snowflake="09876543210"
        )

        scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )
        scene_2 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene_2"
        )

    # Test that a user can create an actor, and that the actor has the correct properties.
    def test_create_actor(self):
        user_1 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="1234567890"
        )
        scene_1 = Scene.objects.filter(scene_author=user_1).first()
        url = reverse("actor-list", args=[scene_1.pk])
        client = APIClient()
        client.force_authenticate(user=user_1)
        actor_data = {
            "actor_name": "test_actor",
            "actor_base_user_id": "1234567890",
        }

        response = client.post(url, actor_data, format="json")
        self.assertEqual(response.status_code, 201)

        response_dict = response.json()
        self.assertEqual(response_dict["actor_name"], "test_actor")
        self.assertEqual(response_dict["settings"], DEFAULT_ACTOR_SETTINGS())
        self.assertIsNotNone(Outfit.objects.get(actor_name="test_actor"))

        created_actor = Outfit.objects.get(actor_name="test_actor")
        self.assertEqual(created_actor.performer.user_snowflake, "1234567890")
        self.assertEqual(
            DiscordData.objects.filter(user_snowflake="1234567890").count(), 1
        )

        # Test create an actor based on a user snowflake that doesn't exist
        actor_data = {
            "actor_name": "test_actor_2",
            "actor_base_user_id": "6969420",
        }
        response = client.post(url, actor_data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["actor_name"], "test_actor_2")
        self.assertEqual(response_dict["settings"], DEFAULT_ACTOR_SETTINGS())
        self.assertIsNotNone(Outfit.objects.get(actor_name="test_actor_2"))
        self.assertIsNotNone(DiscordData.objects.get(user_snowflake="6969420"))

    # Make sure that a user can't access, edit, or delete another user's actor
    def test_get_actor_for_other_user(self):
        user_2 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="09876543210"
        )
        actor_user_data = DiscordData.objects.create(user_snowflake="6969420")
        scene = Scene.objects.first()
        actor_test = Outfit.objects.create(
            actor_name="test_actor_2", actor_base_user=actor_user_data, scene=scene
        )

        url = reverse("actor-detail", args=[scene.pk, actor_test.pk])
        client = APIClient()
        client.force_authenticate(user=user_2)

        response = client.get(url)
        self.assertEqual(response.status_code, 403)
        bad_put_data = {"actor_name": "hehehe get rekt"}
        response = client.put(url, bad_put_data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            Outfit.objects.get(pk=actor_test.pk).outfit_name, "test_actor_2"
        )
        response = client.delete(url)
        self.assertEqual(response.status_code, 403)

    # Make sure that a user can access their own actor
    def test_get_actor_for_self(self):
        user_1 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="1234567890"
        )
        actor_user_data = DiscordData.objects.create(user_snowflake="6969420")
        scene = Scene.objects.first()
        actor_test = Outfit.objects.create(
            actor_name="test_actor_2", actor_base_user=actor_user_data, scene=scene
        )

        url = reverse("actor-detail", args=[scene.pk, actor_test.pk])
        client = APIClient()

        client.force_authenticate(user=user_1)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["actor_name"], "test_actor_2")

    # Make sure that a user can edit their actor
    def test_edit_actor(self):
        user_1 = DiscordPointingUser.objects.get(
            discord_data__user_snowflake="1234567890"
        )
        actor_user_data = DiscordData.objects.create(user_snowflake="6969420")
        scene = Scene.objects.first()
        actor_test = Outfit.objects.create(
            actor_name="test_actor_2", actor_base_user=actor_user_data, scene=scene
        )
        url = reverse("actor-detail", args=[scene.pk, actor_test.pk])
        client = APIClient()
        client.force_authenticate(user=user_1)
        put_data = {"actor_name": "test_actor_3"}
        response = client.put(url, put_data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["actor_name"], "test_actor_3")
        self.assertEqual(
            Outfit.objects.get(pk=actor_test.pk).outfit_name, "test_actor_3"
        )

    # Make sure that anyone can retrieve the actor's specific information via the ActorDetailReadOnly view
    def test_actor_stage(self):
        actor_user_data = DiscordData.objects.create(user_snowflake="6969420")
        scene = Scene.objects.first()
        actor_test = Outfit.objects.create(
            actor_name="test_actor_2", actor_base_user=actor_user_data, scene=scene
        )
        url = reverse("actor-stage", args=[actor_test.identifier])
        client = APIClient()
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["actor_name"], "test_actor_2")
        client.force_authenticate(user=DiscordPointingUser.objects.first())
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["actor_name"], "test_actor_2")

    # Make sure that you can add animations to an actor, and access their urls.
    def test_actor_animation(self):
        pass
