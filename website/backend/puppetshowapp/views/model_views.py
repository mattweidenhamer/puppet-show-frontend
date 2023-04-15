from ..models.authentication_models import DiscordPointingUser
from ..models.data_models import DiscordData
from ..models.configuration_models import Actor, Scene
from ..serializers import *

from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status, mixins, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# views needed:
# Create Scene (POST)
# View Scene information (GET)
# Change Scene (PUT)
# Create actor (POST)
# View Actor information (GET   )
# Change Actor (PUT)
# Get scene and all associated actors (GET)


class SceneList(generics.ListCreateAPIView):
    # Query all the scenes that the user has created.
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SceneSerializer

    def get_queryset(self):
        user = self.request.user
        return Scene.objects.filter(scene_author=user)


class SceneDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SceneSerializer

    def get_queryset(self):
        user = self.request.user
        return Scene.objects.filter(scene_author=user)


class ActorList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ActorSerializer
    # Query all the actors in the provided scene.

    def get_queryset(self):
        return Actor.objects.filter(scene=self.kwargs["scene_pk"])


class ActorDetailModifiable(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer

    def get_queryset(self):
        return Actor.objects.filter(scene=self.kwargs["scene_pk"])


class ActorDetailReadOnly(generics.RetrieveAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializerStage

    def get_queryset(self):
        return Actor.objects.filter(identifier=self.kwargs["actorID"])
