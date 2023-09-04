import csv
from django.db import connection
from django.http import HttpResponse

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions, viewsets, status, generics, mixins
from rest_framework.parsers import MultiPartParser

from users.authentication import JWTAuthentication

# Create your views here.
from .models import Order, OrderItem
from .serializers import OrderItemSerializer, OrderSerializer
from manager.pagination import CustomPagination

class OrderGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin):
    """Orders views.

    Args:
        generics (object): GenericAPIView
        mixins (object): ListModelMixin


    """

    # permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = CustomPagination

    def get(self, request, pk=None):
        """Get order by id

        Args:
            request (HttpRequest):
            pk (str, optional): Order represented by id. Defaults to None.

        Returns:
            _type_: _description_
        """
        if pk:
            return Response({
                'data': self.retrieve(request, pk).data
            })
        return self.list(request)



class ExportAPIView(APIView):
    """_summary_"""
    # permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        """_summary_

        Args:
            request (_type_): _description_

        Returns:
            _type_: _description_
        """
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment: filename=orders.csv'

        orders = Order.objects.all()
        writer = csv.writer(response)

        writer.writerow(['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'])

        for order in orders:
            writer.writerow([order.id, order.name, order.email, '', '', ''])
            orderItems = OrderItem.objects.all().filter(order_id=order.id)
            for item in orderItems:
                writer.writerow(['', '', '', item.product_title, item.price, item.quantity])

        return response


class ChartAPIView(APIView):
    """_summary_"""

    # permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, _):
        """_summary_

        Args:
            request (_type_): _description_

        Returns:
            _type_: _description_
        """

        with connection.cursor() as cursor:
            cursor.execute("""
            SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date,
            sum(i.quantity * i.price) as sum
            FROM orders_order as o
            JOIN orders_orderitem as i ON o.id = i.order_id
            GROUP BY date;
            """)
            row = cursor.fetchall()

        data = [{
            'date': result[0],
            'sum': result[1]
        } for result in row]

        return Response({
            'data': data
        })