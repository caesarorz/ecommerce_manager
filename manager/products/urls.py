

from django.urls import path, include
from .views import FileUploadView, ProductViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('products', ProductViewSet, basename='Products')

app_name = 'products'

urlpatterns = [
    path('', include(router.urls)),
]





# urlpatterns = [
#         # path('upload', FileUploadView.as_view()),
#         # path('products', ProductViewSet.as_view({
#         #     'get': 'list',
#         #     'post': 'create',
#         # })),
#         # path('products/<str:pk>', ProductViewSet.as_view({
#         #     'delete': 'delete',
#         #     'put': 'update',
#         #     'get': 'retrieve'
#         # })),
#       ]

