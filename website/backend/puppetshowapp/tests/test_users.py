from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from ..models import Actor, Scene, DiscordPointingUser, DiscordData
import os


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
