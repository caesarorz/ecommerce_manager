
from django.core.files.storage import default_storage


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions, viewsets, status, generics, mixins
from rest_framework.parsers import MultiPartParser


from users.authentication import JWTAuthentication

# Create your views here.
from .models import Product
from .serializers import ProductSerializer
from manager.pagination import CustomPagination


class ProductGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, mixins.CreateModelMixin,
    mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomPagination

    def get(self, request, pk=None):
        print("get ", request.data)
        if pk:
            return Response({
                'data': self.retrieve(request, pk).data
            })
        return self.list(request)

    def post(self, request):
        print("post ", request.data)
        return Response({
            'data': self.create(request).data
        })

    def put(self, request, pk=None):
        print("put ", request.data, pk)
        return Response({
            'data': self.partial_update(request, pk).data
        })

    def delete(self, request, pk=None):
        return self.destroy(request, pk)


class FileUploadView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser,)

    def post(self, request):
        file = request.FILES['image']
        filename = default_storage.save(file.name, file)
        url = default_storage.url(filename)
        print("file ", url)
        return Response({
            'url': 'http://localhost:8001/api' + url
        })