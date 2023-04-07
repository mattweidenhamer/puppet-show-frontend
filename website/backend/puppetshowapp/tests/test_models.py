from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from ..models import Actor, Scene, DiscordPointingUser, DiscordData
import os

TEST_FOLDER_LOCATION = os.path.join(os.path.dirname(__file__), "static_test_files")


class DataTestCase(TestCase):
    # Create DiscordData objects and make sure they are correctly saved
    def setUp(self):
        DiscordData.objects.create(
            user_snowflake="1234567890", user_username="testuser"
        )
        DiscordData.objects.create(
            user_snowflake="09876543210", user_username="testuser_2"
        )

    def test_creation(self):
        data_1 = DiscordData.objects.get(user_snowflake="1234567890")
        data_2 = DiscordData.objects.get(user_snowflake="09876543210")

        self.assertEqual(data_1.user_username, "testuser")
        self.assertEqual(data_2.user_username, "testuser_2")


class ActorTestCase(TestCase):
    # Create Actor objects and their scenes, make sure they are correctly saved
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

    # Make sure that the Actor objects are correctly linked to the Scene objects
    def test_scene_link(self):
        actor_1 = Actor.objects.get(actor_name="test_actor")
        actor_2 = Actor.objects.get(actor_name="test_actor_2")

        scene_1 = Scene.objects.get(scene_name="test_scene")

        self.assertEqual(actor_1.scene, scene_1)
        self.assertEqual(actor_2.scene, scene_1)

    # Make sure that the Actor objects can save and load their data correctly, in particular their image data
    # In addition, make sure that overwritten data is successfully deleted
    def test_image_data(self):
        actor_1 = Actor.objects.get(actor_name="test_actor")

        test_image_1 = SimpleUploadedFile(
            name="test_image_1.gif",
            content=open(
                os.path.join(
                    TEST_FOLDER_LOCATION,
                    "Tair_Speak.gif",
                ),
                "rb",
            ).read(),
            content_type="image/gif",
        )
        test_image_2 = SimpleUploadedFile(
            name="test_image_2.gif",
            content=open(
                os.path.join(TEST_FOLDER_LOCATION, "Tair_Mute.gif"), "rb"
            ).read(),
            content_type="image/gif",
        )

        actor_1.setImage(Actor.Attributes.SPEAKING, test_image_1)
        actor_1.setImage(Actor.Attributes.NOT_SPEAKING, test_image_2)
        actor_1.setImage(Actor.Attributes.NOT_SPEAKING, test_image_1)
        actor_1.setImage(Actor.Attributes.SPEAKING, test_image_2)

        # TODO Good enough for now, to check that things aren't crashing
        # But will probably need to validate the images more


class SceneTestCase(TestCase):
    pass
