"""puppetshowsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from puppetshowapp.views import authentication_views
from puppetshowapp.views.model_views import UserView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("ps/", include("puppetshowapp.urls")),
    path("login/", authentication_views.login_redirect_discord),
    path("callback/", authentication_views.discord_user_callback),
    path("logout/", authentication_views.discord_user_logout),
    path("user/", UserView.as_view())
    # path("accounts/", include("allauth.urls")),
    # path("auth", include("social_django.urls", namespace="social"))
    # path("auth/", views.auth),
    # path("auth/register/", views.register),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
