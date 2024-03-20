from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Permission, Role
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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
    role = RoleRelatedField(many=False, queryset=Role.objects.all())
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'username', 'last_name', 'role', 'is_admin']

    def get_id(self, obj):
        return obj.id

    def get_is_admin(self, obj):
        return obj.is_staff

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


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, user):

        if user.is_active:

            token = super().get_token(user)
            token['is_staff'] = user.is_staff
            return token

        raise serializers.ValidationError({'active': 'User must confirm email to be actived.'})