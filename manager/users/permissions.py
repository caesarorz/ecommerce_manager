from rest_framework import permissions

from .serializers import UserSerializer


class PermissionFailed(Exception):
    pass


class ViewPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        data = UserSerializer(request.user).data

        try:
            view_access = any(p['name'] == 'view_' + view.permission_object for p in data['role']['permissions'])
            edit_access = any(p['name'] == 'edit_' + view.permission_object for p in data['role']['permissions'])
        except PermissionFailed:
            raise("User do not have permissions or role assigned. Check user!")

        if request.method == 'GET':
            return view_access or edit_access

        return edit_access