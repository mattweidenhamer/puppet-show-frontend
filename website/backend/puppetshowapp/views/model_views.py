from ..models.authentication_models import DiscordPointingUser
from ..models.data_models import DiscordData
from ..models.configuration_models import Outfit, Scene
from ..serializers import *
from ..permissions import IsObjectOwner

from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status, mixins, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class SceneList(generics.ListCreateAPIView):
    # Query all the scenes that the user has created.
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SceneSerializer

    def get_queryset(self):
        user = self.request.user
        return Scene.objects.filter(scene_author=user)

    def perform_create(self, serializer):
        serializer.save(scene_author=self.request.user)


class SceneDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsObjectOwner]
    serializer_class = SceneSerializer
    queryset = Scene.objects.all()


class ActorList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ActorSerializer
    # Query all the actors in the provided scene.

    def get_queryset(self):
        return Outfit.objects.filter(scene=self.kwargs["scene_pk"])

    def perform_create(self, serializer):
        if not serializer.is_valid():
            return JsonResponse(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": f"Invalid data: {serializer.errors}"},
            )
        scene = Scene.objects.get(pk=self.kwargs["scene_pk"])
        serializer.save(scene=scene)


class ActorDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsObjectOwner]
    queryset = Outfit.objects.all()
    serializer_class = ActorSerializer


# class ActorDetailReadOnly(generics.RetrieveAPIView):
#     queryset = Outfit.objects.all()
#     serializer_class = ActorSerializerStage
#     lookup_field = "identifier"


# class AddDiscordDataToUsersAddedUsers(generics.CreateAPIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = DiscordDataSerializer

#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             user = DiscordPointingUser.objects.get(user=self.request.user)
#             snowflake = serializer.validated_data["user_snowflake"]
#             if user.added_users.filter(user_snowflake=snowflake).exists():
#                 return JsonResponse(
#                     status=status.HTTP_409_CONFLICT,
#                     data={"message": "Discord Data already bound to user."},
#                 )
#             discord_data, created = DiscordData.objects.get_or_create(
#                 user_snowflake=snowflake
#             )
#             user.added_users.add(discord_data)


class PerformanceView(generics.RetrieveAPIView):
    queryset = Performer.objects.all()
    serializer_class = PerformerSerializer
    lookup_field = "identifier"


class CreatePerformer(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Performer.objects.all()
    serializer_class = PerformerSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            try:
                # See if there is already a performer by this user with the same snowflake.
                performer = Performer.objects.get(
                    parent_user__discord_snowflake=self.request.user.discord_snowflake,
                    discord_snowflake=serializer.validated_data["discord_snowflake"],
                )
                return JsonResponse(
                    status=status.HTTP_409_CONFLICT,
                    data={
                        "message": "Performer with that snowflake already exists under this account."
                    },
                )
            except Performer.DoesNotExist:
                pass
            serializer.save(parent_user=self.request.user)
