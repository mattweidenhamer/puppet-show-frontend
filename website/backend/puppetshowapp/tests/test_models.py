from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from ..models import Actor, Scene, DiscordPointingUser, DiscordData
import os

TEST_FOLDER_LOCATION = os.path.join(os.path.dirname(__file__), "static_test_files")


class UserTestCase(TestCase):
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
            email="test_email@gmail.com",
            discord_data=user_data_1,
            password="test",
        )
        normal_user_2 = DiscordPointingUser.objects.create(
            email="test_email_2@gmail.com",
            discord_data=user_data_2,
            password="test_2",
        )
        superuser = DiscordPointingUser.objects.create_superuser(
            email="test_email_super@gmail.com",
            discord_data=superuser_data,
            password="test_super",
        )

        # Test Scene 1 has only actor 1 in it
        test_scene_1 = Scene.objects.create(
            scene_author=normal_user_1, scene_name="test_scene"
        )
        # Test Scene 2 has both actor 1 and actor 2 in it
        test_scene_2 = Scene.objects.create(
            scene_author=normal_user_2, scene_name="test_scene_2"
        )

        Actor.objects.create(
            actor_base_user=user_data_1, actor_name="test_actor", scene=test_scene_1
        )
        Actor.objects.create(
            actor_base_user=user_data_2, actor_name="test_actor_2", scene=test_scene_2
        )
        Actor.objects.create(
            actor_base_user=user_data_1, actor_name="test_actor_3", scene=test_scene_2
        )

    def test_user_properties(self):
        normal = DiscordPointingUser.objects.get(email="test_email@gmail.com")
        self.assertEqual(normal.is_superuser, False)

        superuser = DiscordPointingUser.objects.get(email="test_email_super@gmail.com")
        self.assertEqual(superuser.is_superuser, True)

    def test_user_permissions(self):
        normal_1 = DiscordPointingUser.objects.get(email="test_email@gmail.com")
        normal_2 = DiscordPointingUser.objects.get(email="test_email_2@gmail.com")

        superuser = DiscordPointingUser.objects.get(email="test_email_super@gmail.com")

        test_scene_1 = Scene.objects.get(scene_name="test_scene")
        test_scene_2 = Scene.objects.get(scene_name="test_scene_2")

        test_actor_1 = Actor.objects.get(actor_name="test_actor")
        test_actor_2 = Actor.objects.get(actor_name="test_actor_2")
        test_actor_3 = Actor.objects.get(actor_name="test_actor_3")

        # Test that normal users can only access their own scenes
        self.assertEqual(
            normal_1.has_perm("puppetshowapp.view_scene", test_scene_1), True
        )
        self.assertEqual(
            normal_1.has_perm("puppetshowapp.view_scene", test_scene_2), False
        )
        self.assertEqual(
            normal_2.has_perm("puppetshowapp.view_scene", test_scene_1), False
        )
        self.assertEqual(
            normal_2.has_perm("puppetshowapp.view_actor", test_actor_2), True
        )

        # Test that normal users can only access actors in their own scenes
        self.assertEqual(
            normal_1.has_perm("puppetshowapp.view_actor", test_actor_1), True
        )
        self.assertEqual(
            normal_1.has_perm("puppetshowapp.view_actor", test_actor_2), False
        )
        self.assertEqual(
            normal_1.has_perm("puppetshowapp.view_actor", test_actor_3), False
        )
        self.assertEqual(
            normal_2.has_perm("puppetshowapp.view_actor", test_actor_1), False
        )
        self.assertEqual(
            normal_2.has_perm("puppetshowapp.view_actor", test_actor_2), True
        )
        self.assertEqual(
            normal_2.has_perm("puppetshowapp.view_actor", test_actor_3), True
        )

        # Test that the superuser can access all scenes and actors
        self.assertEqual(
            superuser.has_perm("puppetshowapp.view_scene", test_scene_1), True
        )
        self.assertEqual(
            superuser.has_perm("puppetshowapp.view_scene", test_scene_2), True
        )
        self.assertEqual(
            superuser.has_perm("puppetshowapp.view_actor", test_actor_1), True
        )
        self.assertEqual(
            superuser.has_perm("puppetshowapp.view_actor", test_actor_2), True
        )
        self.assertEqual(
            superuser.has_perm("puppetshowapp.view_actor", test_actor_3), True
        )


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
            email="testemail@gmail.com", discord_data=user_data_1, password="test"
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
