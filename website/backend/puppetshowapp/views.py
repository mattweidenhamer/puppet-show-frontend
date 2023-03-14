from django.http import HttpResponse
from rest_framework import generics
from .models import Actor
from .serializers import ActorSerializer


def index(request):
    return HttpResponse("Hello, World.")

class ActorApi(generics.ListCreateAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    

# Create your views here.
