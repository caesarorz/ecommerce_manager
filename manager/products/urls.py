
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import FileUploadView, ProductViewSet, create_product

urlpatterns = [
        path('upload', FileUploadView.as_view()),
        path('products', ProductViewSet.as_view({                 # OK
            'get': 'list',                                  # OK
            # 'post': 'create',                               # XXXXX
        })),
        path('products/create', create_product, name='create-product'),
        path('products/<str:pk>', ProductViewSet.as_view({  # OK
            'delete': 'delete',                             # OK
            'put': 'update',                                # OK
            'get': 'retrieve'                               # OK
        })),
      ]

urlpatterns += static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
