from rest_framework import serializers
from .models import Letter

from django.contrib.auth.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = '__all__'
        read_only_fields = ['user']

class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ['id', 'user', 'title', 'body', 'created_at', 'unlock_at', 'unlocked', 'reflection', 'mood']
        read_only_fields = ['id', 'user', 'created_at', 'unlocked']

