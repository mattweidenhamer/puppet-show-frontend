from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

# router = routers.DefaultRouter()
# router.register(r"actors", views.ActorViewSet)
# router.register(r"scenes", views.SceneViewSet)
# router.register(r"users", views.UserViewSet)
# router.register(r"discorddata", views.DiscordDataViewSet)


urlpatterns = [
    path("", api_root),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("scenes/", SceneList.as_view(), name="scene-list"),
    path("scenes/<int:pk>/", SceneDetail.as_view(), name="scene-detail"),
    path("users/", UserList.as_view(), name="user-list"),
    path("users/create/", UserCreate.as_view(), name="user-create"),
    path("users/<int:pk>/", UserDetail.as_view(), name="user-detail"),
    path("actors/create/", ActorCreate.as_view(), name="actor-create"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
