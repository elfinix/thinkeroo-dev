from rest_framework import serializers
from .models import ClassPost

class ClassPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassPost
        fields = '__all__'
