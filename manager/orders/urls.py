
from django.urls import path

from .views import OrderGenericAPIView, ExportAPIView, ChartAPIView

urlpatterns = [
    path('orders', OrderGenericAPIView.as_view()),
    path('orders/<int:pk>', OrderGenericAPIView.as_view()),
    path('export', ExportAPIView.as_view()),
    path('chart', ChartAPIView.as_view())
]