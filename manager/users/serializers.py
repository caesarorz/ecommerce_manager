from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Permission, Role
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


class PermissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Permission
        fields = '__all__'


class PermissionRelatedField(serializers.StringRelatedField):

    def to_representation(self, value):
        return PermissionSerializer(value).data

    def to_internal_value(self, data):
        return data


class RoleSerializer(serializers.ModelSerializer):

    permissions = PermissionRelatedField(many=True)

    class Meta:
        model = Role
        fields = '__all__'

    def create(self, validated_data):
        permissions = validated_data.pop('permissions', None)
        instance = self.Meta.model(**validated_data)
        instance.save()
        instance.permissions.add(*permissions)
        instance.save()
        return instance


class RoleRelatedField(serializers.RelatedField):
    def to_representation(self, instance):
        return RoleSerializer(instance).data

    def to_internal_value(self, data):
        return self.queryset.get(pk=data)


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'role', 'is_active', 'is_staff']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        """Create and return a user with encrypted password."""
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        print(user)
        return user

    def update(self, instance, validated_data):
        """Update and return user."""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'token', 'role']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# class EmptyPayloadResponseSerializer(serializers.Serializer):
#     detail = serializers.CharField()


# class UserSerializerWithToken(UserSerializer):
#     token = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

#     def get_token(self, obj):
#         token = RefreshToken.for_user(obj)
#         return str(token.access_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, user):

        if user.is_active:

            token = super().get_token(user)
            token['is_staff'] = user.is_staff
            return token

        raise serializers.ValidationError({'active': 'User must confirm email to be actived.'})