from django.db.models.signals import pre_save
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class Permission(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=200)
    permissions = models.ManyToManyField(Permission)

    def __str__(self) -> str:
        return self.name


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address.')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    username = models.CharField(max_length=200, unique=True, default='')
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now=False, auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)