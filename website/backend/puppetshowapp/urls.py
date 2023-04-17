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
    path("user/", user_views.UserInfo.as_view(), name="user-info"),
    path("scenes/", model_views.SceneList.as_view(), name="scene-list"),
    path("scenes/<int:pk>/", model_views.SceneDetail.as_view(), name="scene-detail"),
    path(
        "scenes/<int:scene_pk>/outfits/",
        model_views.OutfitList.as_view(),
        name="outfit-list",
    ),
    path(
        "scenes/<int:scene_pk>/outfits/<int:pk>/",
        model_views.OutfitDetail.as_view(),
        name="outfit-detail",
    ),
    path(
        "performers/",
        model_views.PerformerList.as_view(),
        name="performer-list",
    ),
    path(
        "performers/<uuid:identifier>/",
        model_views.PerformerDetail.as_view(),
        name="performer-detail",
    ),
    # TODO not restful
    path(
        "scenes/<int:pk>/setActive",
        model_views.SetActiveScene.as_view(),
        name="set-active-scene",
    ),
    path(
        "stage/<uuid:identifier>/",
        model_views.PerformanceView.as_view(),
        name="stage-performance",
    ),
]
