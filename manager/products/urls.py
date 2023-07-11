

from django.urls import path
from .views import FileUploadView, ProductViewSet

urlpatterns = [
        path('upload', FileUploadView.as_view()),
        path('products', ProductViewSet.as_view({
            'get': 'list',
            'post': 'create',
        })),
        path('products/<str:pk>', ProductViewSet.as_view({
            'delete': 'delete',
            'put': 'update',
            'get': 'retrieve'
        })),
      ]

