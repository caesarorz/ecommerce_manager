from django.urls import path

from .views import (get_users, register_user, logout, MyTokenObtainPairView,
                    RoleViewSet, ProfileInfoAPIView, PermissionAPIView,
                    UserViewSet, ProfilePasswordAPIView, TokenCreateView)

urlpatterns = [
    # path('users', get_users), # OK
    path('user/info', ProfileInfoAPIView.as_view()),           #  OK (just with the user info)
    path('user/password', ProfilePasswordAPIView.as_view()),   #  X (changed password not working during login)
    path('register', register_user),
    path('login', TokenCreateView.as_view()),
    path('logout', logout),
    path('permissions', PermissionAPIView.as_view()),
    path('users', UserViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('users/<str:pk>', UserViewSet.as_view({
        'delete': 'delete',
        'put': 'update',
        'get': 'retrieve'
    })),
    path('roles', RoleViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('roles/<str:pk>', RoleViewSet.as_view({
        'delete': 'delete',
        'put': 'update',
        'get': 'retrieve'
    })),
]