from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from .views import authentication_views, model_views, user_views

# router = routers.DefaultRouter()
# router.register(r"actors", views.ActorViewSet)
# router.register(r"scenes", views.SceneViewSet)
# router.register(r"users", views.UserViewSet)
# router.register(r"discorddata", views.DiscordDataViewSet)


urlpatterns = [
    path("users/", user_views.UserList.as_view(), name="user-list"),
    path("users/<int:pk>/", user_views.UserDetail.as_view(), name="user-detail"),
    path("scenes/", model_views.SceneList.as_view(), name="scene-list"),
    path("scenes/<int:pk>/", model_views.SceneDetail.as_view(), name="scene-detail"),
    path("scenes/<int:pk>/actors/", model_views.ActorList.as_view(), name="actor-list"),
    path(
        "scenes/<int:pk>/actors/<int:actorpk>/",
        model_views.ActorDetailModifiable.as_view(),
        name="actor-detail",
    ),
    path(
        "actorDisplay/<uuid:actorID>/",
        model_views.ActorDetailReadOnly.as_view(),
        name="actor-stage",
    ),
]
