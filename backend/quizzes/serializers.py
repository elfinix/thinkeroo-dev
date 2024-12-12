from rest_framework import serializers
from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

    def create(self, validated_data):
        # You can implement additional logic for creating a quiz if needed
        return Quiz.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.schedule = validated_data.get('schedule', instance.schedule)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
