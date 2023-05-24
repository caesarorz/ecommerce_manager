from django.urls import path

from .views import (get_users, register, login, AuthenticateUser, logout,
                PermissionAPIView, RoleViewSet, UserGenericAPIView, ProfileInfoAPIView,
                ProfilePasswordAPIView)

urlpatterns = [
    path('listusers', get_users),                       # OK. is a get users mejorar (not to show my user)
    path('register', register),                         # OK
    path('login', login),                               # OK
    path('logout', logout),                             # OK mejorar (erase states)
    path('user', AuthenticateUser.as_view()),           # OK when login, authenticates the user
    path('permissions', PermissionAPIView.as_view()),   # OK list permissions only
    path('roles', RoleViewSet.as_view({
        'get': 'list',                                  # OK
        'post': 'create',                               # OK
    })),
    path('roles/<str:pk>', RoleViewSet.as_view({        # not using
        'delete': 'delete',                             # OK
        'put': 'update',                                # X
        'get': 'retrieve'                               # no using (seems)
    })),
    path('users/info', ProfileInfoAPIView.as_view()),           #  OK (just with the user info)
    path('users/password', ProfilePasswordAPIView.as_view()),   #  X (changed password not working during login)
    path('users', UserGenericAPIView.as_view()),                # GET: seems not working   PUT: OK     DEL: OK     POST: OK
    path('users/<str:pk>', UserGenericAPIView.as_view()),       #
]