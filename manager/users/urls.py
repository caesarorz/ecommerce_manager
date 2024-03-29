from django.urls import path

from .views import (
    register_user,
    logout,
    TokenCreateView,
    RoleViewSet,
    PermissionAPIView,
    ProfilePasswordAPIView,
    CreateUserView,
    UserDetail,
    UserList,
    UserUpdateView,
)


app_name = 'users'

urlpatterns = [
    # path('users', get_users), # OK
    # path('user/info', ProfileInfoAPIView.as_view()),           #  OK (just with the user info)
    path('user/password/', ProfilePasswordAPIView.as_view()),   #  X (changed password not working during login)
    path('register/', register_user),
    path('login/', TokenCreateView.as_view()),
    path('logout/', logout),
    path('permissions/', PermissionAPIView.as_view()),
    path('user/create/', CreateUserView.as_view(), name='add'),
    path('user/update/<int:pk>/', UserUpdateView.as_view(), name='update'),
    path('user/<int:pk>/', UserDetail.as_view(), name='detail'),
    path('user/', UserList.as_view(), name='list'),
    # path('<int:pk>/', UserDetail.as_view(), name='detail'),
    # path('users', UserViewSet.as_view({
    #     'get': 'list',
    #     'post': 'create',
    # })),
    # path('users/<str:pk>', UserViewSet.as_view({
    #     'delete': 'delete',
    #     'put': 'update',
    #     'get': 'retrieve'
    # })),
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