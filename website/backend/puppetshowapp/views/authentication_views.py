from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from ..secrets.constants import (
    DISCORD_OAUTH_URL,
)


# This should be called to redirect the user to Discord's login page
def login_redirect_discord(request):
    return redirect(DISCORD_OAUTH_URL)


def discord_user_callback(request):
    user = authenticate(request)
    if user is not None:
        login(request, user)
        # TODO figure out a way to redirect this back to whatever page they were previously on.
        return redirect("/")
    else:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)


def discord_user_logout(request):
    logout(request)
    return redirect("/")
