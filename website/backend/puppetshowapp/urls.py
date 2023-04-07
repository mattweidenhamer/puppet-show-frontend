from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from .views import authentication_views, model_views

# router = routers.DefaultRouter()
# router.register(r"actors", views.ActorViewSet)
# router.register(r"scenes", views.SceneViewSet)
# router.register(r"users", views.UserViewSet)
# router.register(r"discorddata", views.DiscordDataViewSet)


urlpatterns = [
    path("scenes/", model_views.SceneView.as_view()),
    path(
        "scenes/<int:pk>/", model_views.SceneViewIndividual.as_view()
    ),  # Return scene and all actors
    # path("actors/<uuid:uuid>/", model_views.ActorView.as_view())
]
