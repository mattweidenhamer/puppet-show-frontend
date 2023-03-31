from rest_framework import permissions


class ObjectIsOwnerOrDeny(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.get_owner == request.user


class UserIsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user
