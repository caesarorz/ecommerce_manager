from django.urls import path

from .views import (get_users, register_user, logout, MyTokenObtainPairView,
                    RoleViewSet, ProfileInfoAPIView, PermissionAPIView,
                    UserViewSet, ProfilePasswordAPIView)

urlpatterns = [
    # path('users', get_users), # OK
    path('user/info', ProfileInfoAPIView.as_view()),           #  OK (just with the user info)
    path('user/password', ProfilePasswordAPIView.as_view()),   #  X (changed password not working during login)
    path('register', register_user),
    path('login', MyTokenObtainPairView.as_view()),     # OK
    path('logout', logout),
    path('permissions', PermissionAPIView.as_view()),   # OK list permissions only
    path('users', UserViewSet.as_view({
        'get': 'list',                                  # OK
        'post': 'create',                               # OK
    })),
    path('users/<str:pk>', UserViewSet.as_view({        # OK
        'delete': 'delete',                             # OK
        'put': 'update',                                # OK
        'get': 'retrieve'                               # OK
    })),
    path('roles', RoleViewSet.as_view({                 # OK
        'get': 'list',                                  # OK
        'post': 'create',                               # OK
    })),
    path('roles/<str:pk>', RoleViewSet.as_view({        # OK
        'delete': 'delete',                             # OK
        'put': 'update',                                # OK
        'get': 'retrieve'                               # OK
    })),

]