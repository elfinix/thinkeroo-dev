from rest_framework import serializers
from .models import Class

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'class_code', 'name', 'class_limit', 'is_archived', 'archived_at', 'created_at', 'updated_at', 'banner_img']
        read_only_fields = ['id', 'created_at', 'updated_at']
        
    def get_total_students(self, obj):
        return obj.userclass_set.filter(status='active').count()