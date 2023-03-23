from .models import DiscordPointingUserManager as dpum

if __name__ == "__main__":
    dpum.create_superuser("mattweidenhamer@gmail.com", "testpassword", "-1")
