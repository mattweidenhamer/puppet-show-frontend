from ..models.authentication_models import DiscordPointingUser
from ..serializers import *

from rest_framework import generics


class UserList(generics.ListAPIView):
    queryset = DiscordPointingUser.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = DiscordPointingUser.objects.all()
    serializer_class = UserSerializer
