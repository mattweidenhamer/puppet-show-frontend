from django.http import HttpResponse, JsonResponse, Http404
from django.contrib.auth.decorators import login_required
from .models import Actor, Scene, DiscordPointingUser, DiscordData
from .serializers import (
    ActorSerializer,
    SceneSerializer,
    DiscordDataSerializer,
    UserSerializer,
)
from .permissions import ObjectIsOwnerOrDeny, UserIsUser
from rest_framework import viewsets, permissions, status, generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse


# Root
@api_view(["GET"])
def api_root(request, format=None):
    # TODO this should not be list, this should be a bunch of other functions
    return Response(
        {
            "users": reverse("user-list", request=request, format=format),
            "users-create": reverse("user-create", request=request, format=format),
            "scene": reverse("scene-create", request=request, format=format),
            "scene-detail": reverse("scene-detail", request=request, format=format),
            # "actors": reverse("actors-list", request=request, format=format),
            # "data": reverse("data-list", request=request, format=format),
        }
    )


#################################################
# User API functions
#################################################


class UserList(generics.ListAPIView):
    permission_classes = [UserIsUser]
    queryset = DiscordPointingUser.objects.all()
    serializer_class = UserSerializer


class UserCreate(generics.CreateAPIView):
    permission_classes = [UserIsUser]
    queryset = DiscordPointingUser.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [UserIsUser]
    queryset = DiscordPointingUser.objects.all()
    serializer_class = UserSerializer


#################################################
# Scene API Functions
#################################################


class SceneList(generics.ListCreateAPIView):
    permission_classes = [ObjectIsOwnerOrDeny]
    queryset = Scene.objects.all()
    serializer_class = SceneSerializer

    def perform_create(self, serializer):
        serializer.save(scene_author=self.request.user)


class SceneDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [ObjectIsOwnerOrDeny]
    queryset = Scene.objects.all()
    serializer_class = SceneSerializer


#################################################
# Actor API functions
#################################################


class ActorCreate(generics.CreateAPIView):
    permission_classes = [ObjectIsOwnerOrDeny]
    queryset = Scene.objects.all()
    serializer_class = ActorSerializer


class ActorDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [ObjectIsOwnerOrDeny]
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer


#################################################
# Old API functions
#################################################


# @login_required
# @api_view(["GET", "PUT", "DELETE"])
# def interactWithActor(request, userid):
#     # Add permissions test
#     if request.method == "GET":
#         data = Actor.objects.get(actor_hash=userid)
#         serializer = ActorSerializer(data, context={"request": request})
#         return Response(serializer.data)
#     try:
#         actor = Actor.objects.get(actor_hash=userid)
#     except Actor.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == "PUT":
#         serializer = ActorSerializer(
#             actor, data=request.data, context={"request": request}
#         )
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == "DELETE":
#         actor.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# @login_required
# @api_view(["POST"])
# def createActor(request):
#     # Add permissions test
#     serializer = ActorSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @login_required
# @api_view(["POST"])
# def assign_image_to_actor(request):
#     pass


#################################################
# Scene API functions
#################################################

# class SceneViewSet(viewsets.ModelViewSet):
#     queryset = Scene.objects.all()
#     serializer_class = SceneSerializer
#     permission_classes = [permissions.IsAuthenticated]


# def get(self, request):
#     scenes = Scene.objects.all()
#     serializer = SceneSerializer(scenes, many=True)
#     return Response(serializer.data)

# def post(self, request):
#     serializer = SceneSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def get(self, request, pk):
#     scene = self.get_object(pk)
#     serializer = SceneSerializer(scene)
#     return Response(serializer.data)

# def put(self, request, pk):
#     scene = self.get_object(pk)
#     serializer = SceneSerializer(scene, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def delete(self, request, pk):
#     scene = self.get_object(pk)
#     scene.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)


# @login_required
# @api_view(["GET", "PUT", "DELETE"])
# def interactWithScene(request, pk):
#     if request.method == "GET":
#         data = Scene.objects.get(pk=pk)
#         serializer = SceneSerializer(data, context={"request": request})
#         return Response(serializer.data)
#     try:
#         scene = Scene.objects.get(pk=pk)
#     except Scene.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == "PUT":
#         serializer = SceneSerializer(
#             scene, data=request.data, context={"request": request}
#         )
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == "DELETE":
#         scene.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# @login_required
# @api_view(["POST"])
# # TODO make sure that the user is the author of the scene
# def createScene(request):
#     serializer = SceneSerializer(data=request.data)
#     if serializer.is_valid():
#         if request.user.is_authenticated:
#             serializer.save(scene_author=request.user)
#         else:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
#         return Response(status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @login_required
# @api_view(["POST"])
# def registerDiscordData(request):
#     serialzer = DiscordDataSerializer(data=request.data)
#     if serialzer.is_valid():
#         serialzer.save()
#         return Response(status=status.HTTP_201_CREATED)
#     return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# def createUser(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["GET", "POST"])
# def ActorAPIGetPost(request):
#     if request.method == "GET":
#         data = Actor.objects.all()
#         serializer = ActorSerializer(data, context={"request": request}, many=True)

#         return Response(serializer.data)

#     elif request.method == "POST":
#         serializer = ActorSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["PUT", "DELETE"])
# def ActorApiPutDelete(request, pk):
#     # Note: Instead of primary key, could conside using their customized hash.
#     try:
#         actor = Actor.objects.get(pk=pk)
#     except Actor.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == "PUT":
#         serializer = ActorSerializer(
#             actor, data=request.data, context={"request": request}
#         )
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == "DELETE":
#         actor.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
