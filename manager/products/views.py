
from django.core.files.storage import default_storage


from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions, viewsets, status, generics, mixins
from rest_framework.parsers import MultiPartParser

from users.authentication import JWTAuthentication

# Create your views here.
from .models import Product
from .serializers import ProductSerializer, ProductImageSerializer
from manager.pagination import CustomPagination


class ProductViewSet(viewsets.ViewSet):
    """Product View Set"""
    authentication_classes = [JWTAuthentication]
    permission_object = 'products'

    def list(self, request):
        """Retrieve a list of all products
        """
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response({'data': serializer.data})

    def create(self, request):
        """
        """
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product)

        if serializer:
            return Response({
                'data': serializer.data
            })
        return Response('Product doesn\'t exists')

    def update(self, request, pk=None):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, pk=None):
        product = Product.objects.get(id=pk)
        if product:
            product.delete()
            return Response({"data": "Product deleted succesfully"})
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to recipe."""
        product = self.get_object()
        serializer = ProductImageSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FileUploadView(APIView):
    authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser,)

    def post(self, request):
        print("FileUploadView", request)
        print()
        file = request.FILES['image']
        print(file)
        filename = default_storage.save(file.name, file)
        url = default_storage.url(filename)
        return Response({
            'url': url
        })