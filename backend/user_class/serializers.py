from rest_framework import serializers
from .models import UserClass

class UserClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClass
        fields = ['id', 'user', 'class_instance', 'join_date', 'status']
        read_only_fields = ['join_date']
