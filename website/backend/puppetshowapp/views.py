from django.http import HttpResponse
from rest_framework import generics
from .models import Actor
from .serializers import ActorSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


def index(request):
    return HttpResponse("Hello, World.")


class ActorApi(generics.ListCreateAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer







@api_view(["GET", "POST"])
def ActorAPIGetPost(request):
    if request.method == "GET":
        data = Actor.objects.all()
        serializer = ActorSerializer(data, context={"request": request}, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ActorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
def ActorApiPutDelete(request, pk):
    # Note: Instead of primary key, could conside using their customized hash.
    try:
        actor = Actor.objects.get(pk=pk)
    except Actor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = ActorSerializer(actor, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        actor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# Create your views here.
