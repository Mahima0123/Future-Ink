from rest_framework import serializers
from .models import Letter

class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ['id', 'user', 'title', 'body', 'created_at', 'unlock_at', 'unlocked', 'reflection', 'mood']
        read_only_fields = ['id', 'user', 'created_at', 'unlocked']
