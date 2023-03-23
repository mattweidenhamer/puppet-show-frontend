from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Actor, Scene
from .serializers import ActorSerializer, SceneSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


# class ActorApi(generics.ListCreateAPIView):
#     queryset = Actor.objects.all()
#     serializer_class = ActorSerializer


#################################################
# Actor API functions
#################################################


@login_required
@api_view(["GET", "PUT", "DELETE"])
def interactWithActor(request, userid):
    # Add permissions test
    if request.method == "GET":
        data = Actor.objects.get(actor_hash=userid)
        serializer = ActorSerializer(data, context={"request": request})
        return Response(serializer.data)
    try:
        actor = Actor.objects.get(actor_hash=userid)
    except Actor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = ActorSerializer(
            actor, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        actor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@login_required
@api_view(["POST"])
def createActor(request):
    # Add permissions test
    serializer = ActorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#################################################
# Scene API functions
#################################################


@login_required
@api_view(["GET", "PUT", "DELETE"])
def interactWithScene(request, pk):
    if request.method == "GET":
        data = Scene.objects.get(pk=pk)
        serializer = SceneSerializer(data, context={"request": request})
        return Response(serializer.data)
    try:
        scene = Scene.objects.get(pk=pk)
    except Scene.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = SceneSerializer(
            scene, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        scene.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@login_required
@api_view(["POST"])
def createScene(request):
    serializer = SceneSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
