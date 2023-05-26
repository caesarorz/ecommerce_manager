from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import exceptions, viewsets, status, generics, mixins
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password

# # Create your views here.
from .serializers import UserSerializer, PermissionSerializer, RoleSerializer, UserSerializerWithToken
from .models import User, Permission, Role
from manager.pagination import CustomPagination
from .permissions import ViewPermissions

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def logout(_):
    response = Response()
    response.delete_cookie(key='jwt')
    response.data = {
        'message': 'success'
    }
    return response


@api_view(['POST'])
def register_user(request):
    data = request.data

    if data['password'] != data['password_confirm']:
        Response('Passwords do not match!')

    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True) # returns an list
    return Response(serializer.data)


class PermissionAPIView(APIView):
    permission_classes = [IsAuthenticated] # from middleware

    def get(self, request):
        permissions = Permission.objects.all()
        serializer = PermissionSerializer(permissions, many=True)

        if serializer:
            return Response({
                'data': serializer.data
            })
        return Response('Object not found')


class RoleViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated & ViewPermissions]
    permission_classes = [IsAuthenticated]
    permission_object = 'roles'

    def list(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response({'data': serializer.data})

    def create(self, request):
        serializer = RoleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk):
        role = Role.objects.get(id=pk)
        serializer = RoleSerializer(role)

        if serializer:
            return Response({
                'data': serializer.data
            })
        return Response('Role doesn\'t exists')

    def update(self, request, pk=None):
        role = Role.objects.get(id=pk)
        serializer = RoleSerializer(instance=role, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_202_ACCEPTED)

    # destroy
    def delete(self, request, pk=None):
        role = Role.objects.get(id=pk)
        if role:
            role.delete()
            return Response({"data": "Role deleted succesfully"})

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated & ViewPermissions]
    permission_classes = [IsAuthenticated]
    permission_object = 'users'

    def list(self, request):
        roles = User.objects.all()
        serializer = UserSerializer(roles, many=True)
        return Response({'data': serializer.data})

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk):
        role = User.objects.get(id=pk)
        serializer = UserSerializer(role)

        if serializer:
            return Response({
                'data': serializer.data
            })
        return Response('Role doesn\'t exists')

    def update(self, request, pk=None):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_202_ACCEPTED)

    # destroy
    def delete(self, request, pk=None):
        role = User.objects.get(id=pk)
        if role:
            role.delete()
            return Response({"data": "Role deleted succesfully"})

        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileInfoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        return Response(serializer.data)


class ProfilePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        if request.data['password'] != request.data['password_confirm']:
            raise exceptions.ValidationError('Passwords do not match')

        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
