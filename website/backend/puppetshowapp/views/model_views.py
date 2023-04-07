from ..models import Scene, Actor, DiscordData, DiscordPointingUser

from django.http import JsonResponse, HttpResponse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import (
    status,
)  # If nothing else, keep rest framework for the statuses.


# General scene view
class SceneView(View, LoginRequiredMixin):
    model = Scene

    def get(self, request, *args, **kwargs):
        user = request.user
        scenes = Scene.objects.filter(user=user)


# Specific scene view
class SceneViewIndividual(View, LoginRequiredMixin):
    model = Scene

    def get(self, request, *args, **kwargs):
        user = request.user


class UserView(View, LoginRequiredMixin):
    model = DiscordPointingUser

    def get(self, request, *args, **kwargs):
        return HttpResponse(status=status.HTTP_200_OK)
        user = request.user
        user_data = DiscordPointingUser.objects.filter(user=user)
        return JsonResponse(user_data, status=status.HTTP_200_OK)
