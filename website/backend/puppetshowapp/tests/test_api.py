from django.test import TestCase
from django.urls import reverse
from rest_framework.test import (
    APIRequestFactory,
    APIClient,
    APITestCase,
    force_authenticate,
)
from unittest.mock import MagicMock, Mock, patch
import pytest
from pytest_mock import mocker
import requests

from ..models.authentication_models import DiscordPointingUser
from ..models.configuration_models import Scene, Outfit
from ..models.new_models import Performer
from ..constants import DEFAULT_SCENE_SETTINGS, DEFAULT_OUTFIT_SETTINGS


from ..secrets.test_raw import RAW_ME, FAKE_RAW_TOKEN


class UserEndpointTestCase(APITestCase):
    def setUp(self):
        normal_user_1 = DiscordPointingUser.objects.create(
            discord_snowflake="1234567890", discord_username="testuser"
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            discord_snowflake="09876543210", discord_username="testuser_2"
        )

        scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )
        scene_2 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene_2", is_active=True
        )

        performer_1 = Performer.objects.create(
            parent_user=normal_user_1,
            discord_username="test_performer",
            discord_snowflake="6969420",
        )
        performer_2 = Performer.objects.create(
            parent_user=normal_user_2,
            discord_username="test_performer_2",
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
        user = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse("user-info")
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["uuid"], str(user.uuid))
        self.assertEqual(response.data["discord_snowflake"], "1234567890")
        self.assertEqual(response.data["discord_username"], "testuser")
        self.assertEqual(response.data["scenes"][0]["scene_name"], "test_scene")
        self.assertEqual(response.data["active_scene"]["scene_name"], "test_scene_2")

    # Test that the user can update their own user data.
    def test_user_update(self):
        user = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse("user-info")
        response = client.patch(
            url,
            {"discord_snowflake": "1234567890", "discord_username": "testuser_69420"},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["uuid"], str(user.uuid))
        self.assertEqual(response.data["discord_snowflake"], "1234567890")
        self.assertEqual(response.data["discord_username"], "testuser_69420")
        self.assertEqual(
            DiscordPointingUser.objects.get(uuid=user.uuid).discord_username,
            "testuser_69420",
        )
        self.assertEqual(
            DiscordPointingUser.objects.get(
                discord_snowflake="09876543210"
            ).discord_username,
            "testuser_2",
        )

    # Test that user cannot update read-only fields.
    def test_user_update_readonly(self):
        user = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        old_uuid = str(user.uuid)
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse("user-info")
        response = client.patch(
            url,
            {
                "discord_snowflake": "6969420",
                "uuid": "1234567890",
                "discord_username": "testuser_blehghghsgjhsg",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        updated_user = DiscordPointingUser.objects.get(uuid=old_uuid)
        response_dict = response.data
        self.assertEqual(response_dict["uuid"], old_uuid)
        self.assertEqual(response_dict["discord_snowflake"], "1234567890")
        self.assertEqual(response_dict["discord_username"], "testuser_blehghghsgjhsg")
        self.assertEqual(updated_user.discord_username, "testuser_blehghghsgjhsg")
        self.assertEqual(updated_user.discord_snowflake, "1234567890")
        self.assertEqual(str(updated_user.uuid), old_uuid)


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
            parent_user=normal_user_1,
            discord_username="test_performer",
            discord_snowflake="6969420",
        )
        performer_2 = Performer.objects.create(
            parent_user=normal_user_2,
            discord_username="test_performer_2",
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
        user_2 = DiscordPointingUser.objects.get(discord_snowflake="09876543210")
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
        user_1 = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        user_2 = DiscordPointingUser.objects.get(discord_snowflake="09876543210")
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
        user_1 = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
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
        self.assertEqual(len(response_dict["outfits"]), 2)
        self.assertEqual(response_dict["outfits"][0]["outfit_name"], "test_actor")
        self.assertEqual(response_dict["outfits"][1]["outfit_name"], "test_actor_2")

        modified_data = {"scene_name": "test_scene_69"}
        response = client.patch(url, modified_data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene_69").count(), 1)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene").count(), 0)
        response = client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Scene.objects.filter(scene_name="test_scene_69").count(), 0)

    # Make sure that a user can access a list of all of their scenes
    def test_retrieve_scene_list(self):
        user_1 = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
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
        user_2 = DiscordPointingUser.objects.get(discord_snowflake="09876543210")
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
class OutfitEndpointTestCase(APITestCase):
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
        performer_1 = Performer.objects.create(
            parent_user=normal_user_1,
            discord_username="test_performer",
            discord_snowflake="6969420",
        )
        performer_2 = Performer.objects.create(
            parent_user=normal_user_2,
            discord_username="test_performer_2",
            discord_snowflake="112345689101122",
        )

    # Test that a user can create an outfit, and that the outfit has the correct properties.
    def test_create_outfit(self):
        user_1 = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        scene_1 = Scene.objects.filter(scene_author=user_1).first()
        url = reverse("outfit-list", args=[scene_1.pk])
        client = APIClient()
        client.force_authenticate(user=user_1)
        outfit_data = {
            "outfit_name": "test_outfit",
            "performer_id": "6969420",
        }

        response = client.post(url, outfit_data, format="json")
        self.assertEqual(response.status_code, 201)

        response_dict = response.json()
        self.assertEqual(response_dict["outfit_name"], "test_outfit")
        self.assertEqual(response_dict["settings"], DEFAULT_OUTFIT_SETTINGS())
        self.assertIsNotNone(Outfit.objects.get(outfit_name="test_outfit"))

        created_outfit = Outfit.objects.get(outfit_name="test_outfit")
        self.assertEqual(created_outfit.performer.discord_snowflake, "6969420")
        self.assertEqual(
            Performer.objects.filter(discord_snowflake="6969420").count(), 1
        )

    # Test that a a user can create an outfit based only on performer snowflake if the performer doesn't exist.
    # NOT YET IMPLEMENTED
    def test_create_outfit_with_performer_snowflake(self):
        pass
        # outfit_data = {
        #     "actor_name": "test_actor_2",
        #     "actor_base_user_id": "6969420",
        # }
        # response = client.post(url, outfit_data, format="json")
        # self.assertEqual(response.status_code, 201)
        # self.assertIsNotNone(response.content)
        # response_dict = response.json()
        # self.assertEqual(response_dict["actor_name"], "test_actor_2")
        # self.assertEqual(response_dict["settings"], DEFAULT_OUTFIT_SETTINGS())
        # self.assertIsNotNone(Outfit.objects.get(actor_name="test_actor_2"))
        # self.assertIsNotNone(DiscordData.objects.get(user_snowflake="6969420"))

    # Make sure that a user can't access, edit, or delete another user's actor
    def test_get_actor_for_other_user(self):
        user_1 = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        user_2 = DiscordPointingUser.objects.get(discord_snowflake="09876543210")
        performer_1 = Performer.objects.get(discord_snowflake="6969420")
        scene = Scene.objects.filter(scene_author=user_1).first()
        outfit_test = Outfit.objects.create(
            performer=performer_1, scene=scene, outfit_name="test_outfit_2"
        )

        url = reverse("outfit-detail", args=[scene.pk, outfit_test.pk])
        client = APIClient()
        client.force_authenticate(user=user_2)
        response = client.get(url)
        self.assertEqual(response.status_code, 403)
        bad_put_data = {"actor_name": "hehehe get rekt"}
        response = client.put(url, bad_put_data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            Outfit.objects.get(pk=outfit_test.pk).outfit_name, "test_outfit_2"
        )
        response = client.patch(url, bad_put_data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            Outfit.objects.get(pk=outfit_test.pk).outfit_name, "test_outfit_2"
        )
        response = client.delete(url)
        self.assertEqual(response.status_code, 403)
        self.assertIsNotNone(Outfit.objects.get(pk=outfit_test.pk))

    # Make sure that a user can access their own outfits
    def test_get_actor_for_self(self):
        user_1 = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        performer_1 = Performer.objects.get(discord_snowflake="6969420")
        scene = Scene.objects.first()
        outfit_test = Outfit.objects.create(
            performer=performer_1, scene=scene, outfit_name="test_outfit_2"
        )

        url = reverse("outfit-detail", args=[scene.pk, outfit_test.pk])
        client = APIClient()

        client.force_authenticate(user=user_1)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["outfit_name"], "test_outfit_2")

    # Make sure that a user can edit their actor
    def test_edit_actor(self):
        user_1 = DiscordPointingUser.objects.get(discord_snowflake="1234567890")
        performer_1 = Performer.objects.get(discord_snowflake="6969420")
        scene = Scene.objects.first()
        outfit_test = Outfit.objects.create(
            performer=performer_1, scene=scene, outfit_name="test_outfit_2"
        )
        url = reverse("outfit-detail", args=[scene.pk, outfit_test.pk])
        client = APIClient()
        client.force_authenticate(user=user_1)
        patch_data = {"outfit_name": "test_outfit_3"}
        response = client.patch(url, patch_data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["outfit_name"], "test_outfit_3")
        self.assertEqual(
            Outfit.objects.get(pk=outfit_test.pk).outfit_name, "test_outfit_3"
        )

    # Make sure that anyone can retrieve the actor's specific information via the ActorDetailReadOnly view
    # NOTE: This is now a Performer function, not a test function.
    # def test_actor_stage(self):
    #     actor_user_data = DiscordData.objects.create(user_snowflake="6969420")
    #     scene = Scene.objects.first()
    #     outfit_test = Outfit.objects.create(
    #         actor_name="test_actor_2", actor_base_user=actor_user_data, scene=scene
    #     )
    #     url = reverse("actor-stage", args=[outfit_test.identifier])
    #     client = APIClient()
    #     response = client.get(url)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertIsNotNone(response.content)
    #     response_dict = response.json()
    #     self.assertEqual(response_dict["actor_name"], "test_actor_2")
    #     client.force_authenticate(user=DiscordPointingUser.objects.first())
    #     response = client.get(url)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertIsNotNone(response.content)
    #     response_dict = response.json()
    #     self.assertEqual(response_dict["actor_name"], "test_actor_2")

    # Make sure that you can add animations to an actor, and access their urls.
    # TODO write after figuring out what to do with media.
    def test_actor_animation(self):
        pass


class PerformerEndpointTests(APITestCase):
    def setUp(self):
        self.user = DiscordPointingUser.objects.create(
            discord_snowflake="1234567890", discord_username="test_user"
        )
        self.user_2 = DiscordPointingUser.objects.create(
            discord_snowflake="09876543210", discord_username="test_user_2"
        )
        self.performer = Performer.objects.create(
            discord_snowflake="6969420",
            discord_username="test_performer",
            parent_user=self.user,
        )
        self.performer_2 = Performer.objects.create(
            discord_snowflake="6969421",
            discord_username="test_performer_2",
            parent_user=self.user_2,
        )
        self.scene_1 = Scene.objects.create(
            scene_author=self.user, scene_name="test_scene_1"
        )
        self.scene_2 = Scene.objects.create(
            scene_author=self.user, scene_name="test_scene"
        )
        self.outfit = Outfit.objects.create(
            performer=self.performer, scene=self.scene_2, outfit_name="test_outfit"
        )
        self.outfit_2 = Outfit.objects.create(
            performer=self.performer_2, scene=self.scene_2, outfit_name="test_outfit_2"
        )
        self.outfit_3 = Outfit.objects.create(
            performer=self.performer, scene=self.scene_1, outfit_name="test_outfit_3"
        )
        self.outfit_4 = Outfit.objects.create(
            performer=self.performer_2, scene=self.scene_1, outfit_name="test_outfit_4"
        )

    # Make sure that a user can access their own performers
    def test_get_performer_for_self(self):
        url = reverse("performer-detail", args=[self.performer.pk])
        client = APIClient()
        client.force_authenticate(user=self.user)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["discord_username"], "test_performer")

    # Make sure that a user can't access, edit, or delete another user's performer
    def test_get_performer_for_other_user(self):
        url = reverse("performer-detail", args=[self.performer_2.pk])
        client = APIClient()
        client.force_authenticate(user=self.user)
        response = client.get(url)
        self.assertEqual(response.status_code, 403)
        bad_put_data = {"discord_username": "hehehe get rekt"}
        response = client.put(url, bad_put_data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            Performer.objects.get(pk=self.performer_2.pk).discord_username,
            "test_performer_2",
        )
        response = client.patch(url, bad_put_data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            Performer.objects.get(pk=self.performer_2.pk).discord_username,
            "test_performer_2",
        )
        response = client.delete(url)
        self.assertEqual(response.status_code, 403)
        self.assertIsNotNone(Performer.objects.get(pk=self.performer_2.pk))

    # Make sure that a user can add their own performer.
    def test_add_performer_for_self(self):
        url = reverse("performer-list")
        client = APIClient()
        client.force_authenticate(user=self.user)
        good_post_data = {
            "discord_snowflake": "6969422",
        }
        response = client.post(url, good_post_data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(
            response_dict["parent_user_snowflake"], self.user.discord_snowflake
        )
        self.assertEqual(response_dict["discord_snowflake"], "6969422")

    # Make sure that a performer's outfits change when their base user's active scene changes.
    # Is this needed?
    # def test_performer_outfits_change_on_scene_change(self):
    #     url = reverse("performer-detail", args=[self.performer.pk])
    #     client = APIClient()
    #     client.force_authenticate(user=self.user)
    #     response = client.get(url)
    #     self.assertEqual(response.status_code, 200)
    #     outfit


class StageEndpointTestCase(APITestCase):
    def setUp(self):
        self.user = DiscordPointingUser.objects.create(
            discord_snowflake="1234567890", discord_username="test_user"
        )
        self.user_2 = DiscordPointingUser.objects.create(
            discord_snowflake="09876543210", discord_username="test_user_2"
        )
        self.performer = Performer.objects.create(
            discord_snowflake="6969420",
            discord_username="test_performer",
            parent_user=self.user,
        )
        self.performer_2 = Performer.objects.create(
            discord_snowflake="6969421",
            discord_username="test_performer_2",
            parent_user=self.user_2,
        )
        self.scene_1 = Scene.objects.create(
            scene_author=self.user, scene_name="test_scene_1", is_active=True
        )
        self.scene_2 = Scene.objects.create(
            scene_author=self.user, scene_name="test_scene_2"
        )
        self.outfit = Outfit.objects.create(
            performer=self.performer, scene=self.scene_2, outfit_name="test_outfit"
        )
        self.outfit_2 = Outfit.objects.create(
            performer=self.performer_2, scene=self.scene_2, outfit_name="test_outfit_2"
        )
        self.outfit_3 = Outfit.objects.create(
            performer=self.performer, scene=self.scene_1, outfit_name="test_outfit_3"
        )
        self.outfit_4 = Outfit.objects.create(
            performer=self.performer_2, scene=self.scene_1, outfit_name="test_outfit_4"
        )

    # Make sure that anyone, including anonymous users, can access a stage.
    def test_get_stage(self):
        url = reverse("stage-performance", args=[self.performer.identifier])
        client = APIClient()
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["discord_snowflake"], "6969420")
        self.assertEqual(response_dict["get_outfit"]["outfit_name"], "test_outfit_3")
        client.force_authenticate(user=self.user)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["discord_snowflake"], "6969420")
        self.assertEqual(response_dict["get_outfit"]["outfit_name"], "test_outfit_3")
        client.force_authenticate(user=self.user_2)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["discord_snowflake"], "6969420")
        self.assertEqual(response_dict["get_outfit"]["outfit_name"], "test_outfit_3")

    # Make sure that stages cannot be directly modified.
    def test_modify_stage(self):
        url = reverse("stage-performance", args=[self.performer.identifier])
        client = APIClient()
        client.force_authenticate(user=self.user)
        response = client.put(url, {}, format="json")
        self.assertEqual(response.status_code, 405)
        response = client.patch(url, {}, format="json")
        self.assertEqual(response.status_code, 405)

    # Make sure that the outfit returned changes when the creating user's active scene changes.
    def test_performer_outfits_change_on_scene_change(self):
        url = reverse("stage-performance", args=[self.performer.identifier])
        client = APIClient()
        client.force_authenticate(user=self.user)
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["get_outfit"]["outfit_name"], "test_outfit_3")
        self.scene_2.set_active()
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        response_dict = response.json()
        self.assertEqual(response_dict["get_outfit"]["outfit_name"], "test_outfit")


class ChangeSceneEndpointTestCase(APITestCase):
    def setUp(self):
        self.normal_user_1 = DiscordPointingUser.objects.create(
            discord_snowflake="1234567890"
        )
        self.normal_user_2 = DiscordPointingUser.objects.create(
            discord_snowflake="09876543210"
        )

        self.scene_1 = Scene.objects.create(
            scene_author=self.normal_user_1, scene_name="test_scene", is_active=True
        )
        self.scene_2 = Scene.objects.create(
            scene_author=self.normal_user_1, scene_name="test_scene_2"
        )
        self.scene_3 = Scene.objects.create(
            scene_author=self.normal_user_2, scene_name="test_scene_3"
        )
        self.performer_1 = Performer.objects.create(
            parent_user=self.normal_user_1,
            discord_username="test_performer",
            discord_snowflake="6969420",
        )
        self.performer_2 = Performer.objects.create(
            parent_user=self.normal_user_2,
            discord_username="test_performer_2",
            discord_snowflake="112345689101122",
        )

    # Make sure that a user can change their active scene.
    def test_change_scene(self):
        url = reverse("set-active-scene", args=[self.scene_1.pk])
        client = APIClient()
        client.force_authenticate(user=self.normal_user_1)
        response = client.post(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            DiscordPointingUser.objects.get(pk=self.normal_user_1.pk).active_scene.pk,
            self.scene_1.pk,
        )
        self.assertEqual(Scene.objects.get(pk=self.scene_1.pk).is_active, True)
        self.assertEqual(Scene.objects.get(pk=self.scene_2.pk).is_active, False)
        url = reverse("set-active-scene", args=[self.scene_2.pk])
        response = client.post(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            DiscordPointingUser.objects.get(pk=self.normal_user_1.pk).active_scene.pk,
            self.scene_2.pk,
        )
        self.assertEqual(Scene.objects.get(pk=self.scene_1.pk).is_active, False)
        self.assertEqual(Scene.objects.get(pk=self.scene_2.pk).is_active, True)

        client.force_authenticate(user=self.normal_user_2)
        url = reverse("set-active-scene", args=[self.scene_2.pk])
        response = client.post(url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            DiscordPointingUser.objects.get(pk=self.normal_user_1.pk).active_scene.pk,
            self.scene_2.pk,
        )
        self.assertEqual(Scene.objects.get(pk=self.scene_1.pk).is_active, False)
        self.assertEqual(Scene.objects.get(pk=self.scene_2.pk).is_active, True)


class MockDiscordTokenCallback:
    def raise_for_status(self):
        pass

    def json(self):
        return FAKE_RAW_TOKEN


class MockDiscordMeCallback:
    def raise_for_status(self):
        pass

    def json(self):
        return RAW_ME


class TokenExchangeTestCase(APITestCase):
    def setUp(self):
        self.mock_discord_token_callback = MagicMock()
        self.mock_discord_token_callback.raise_for_status = Mock(return_value=None)
        self.mock_discord_token_callback.json = Mock(return_value=FAKE_RAW_TOKEN)
        self.mock_discord_me_callback = MagicMock()
        self.mock_discord_me_callback.raise_for_status = Mock(return_value=None)
        self.mock_discord_me_callback.json = Mock(return_value=RAW_ME)
        self.mock_bad_callback = MagicMock()
        self.raise_for_status = Mock(side_effect=requests.HTTPError("Bad request"))

    # Test that when sending a user token to the endpoint, it authenticates via discord and returns a token.
    def test_token_exchange_existing(self):
        normal_user_1 = DiscordPointingUser.objects.create(
            discord_snowflake="249615304185872395"
        )

        with patch("requests.post", return_value=self.mock_discord_token_callback):
            with patch("requests.get", return_value=self.mock_discord_me_callback):
                url = reverse("token-exchange")
                client = APIClient()
                response = client.get(url, {"code": "test_token"})
        self.assertEqual(response.status_code, 302)
        updated_normal_user = DiscordPointingUser.objects.get(pk=normal_user_1.pk)
        self.assertEqual(
            updated_normal_user.discord_auth_token, FAKE_RAW_TOKEN["access_token"]
        )
        self.assertEqual(
            updated_normal_user.discord_refresh_token, FAKE_RAW_TOKEN["refresh_token"]
        )
        token = response.url.split("token=")[1]
        client.credentials(HTTP_AUTHORIZATION="Token " + token)
        response = client.get(reverse("user-info"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["discord_snowflake"], "249615304185872395")

    # Same as the above test, but the user doesn't exist in the database and should be created.
    def test_token_withuser(self):
        with patch("requests.post", return_value=self.mock_discord_token_callback):
            with patch("requests.get", return_value=self.mock_discord_me_callback):
                url = reverse("token-exchange")
                client = APIClient()
                response = client.get(url, {"code": "test_token"})
        self.assertEqual(response.status_code, 302)
        updated_normal_user = DiscordPointingUser.objects.get(
            discord_snowflake="249615304185872395"
        )
        self.assertEqual(
            updated_normal_user.discord_auth_token, FAKE_RAW_TOKEN["access_token"]
        )
        self.assertEqual(
            updated_normal_user.discord_refresh_token, FAKE_RAW_TOKEN["refresh_token"]
        )
        token = response.url.split("token=")[1]
        client.credentials(HTTP_AUTHORIZATION="Token " + token)
        response = client.get(reverse("user-info"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["discord_snowflake"], "249615304185872395")

    # Test that the endpoint returns a 400 error if the token is invalid or expired.
    def test_token_invalid(self):
        with patch("requests.post", return_value=self.mock_bad_callback):
            url = reverse("token-exchange")
            client = APIClient()
            response = client.get(url, {"code": "test_token"})
        self.assertEqual(response.status_code, 400)
