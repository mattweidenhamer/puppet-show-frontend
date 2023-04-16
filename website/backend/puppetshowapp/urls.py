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
        "scenes/<int:scene_pk>/actors/",
        model_views.ActorList.as_view(),
        name="actor-list",
    ),
    path(
        "scenes/<int:scene_pk>/actors/<int:pk>/",
        model_views.ActorDetail.as_view(),
        name="actor-detail",
    ),
    path(
        "createPerformer/",
        model_views.CreatePerformer.as_view(),
        name="create-performer",
    ),
    path(
        "perform/<uuid:identifier>/",
        model_views.PerformanceView.as_view(),
        name="performance",
    ),
]
