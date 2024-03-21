from django.db.models.signals import pre_save
from django.contrib.auth.models import AbstractUser
from rest_framework.views import APIView
from django.db import models
from rest_framework.response import Response
from django.http import Http404
from users.serializers import UserSerializer


class Permission(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=200)
    permissions = models.ManyToManyField(Permission)

    def __str__(self) -> str:
        return self.name


class User(AbstractUser):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    username = models.CharField(max_length=200, unique=True, default='')
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)


class UserDetail(APIView):
    """
    Retrieve a user instance.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = UserSerializer(snippet)
        return Response(serializer.data)

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)