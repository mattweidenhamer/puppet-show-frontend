from django.contrib import admin
from django.urls import path, re_path
from .views import ActorApi
from . import views

urlpatterns = [path("", views.index, name="index"), path("actors/", ActorApi.as_view)]
