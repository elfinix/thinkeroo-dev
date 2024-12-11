from rest_framework import serializers
from .models import Class

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'class_code', 'name', 'class_limit', 'is_archived', 'archived_at', 'created_at', 'updated_at']
