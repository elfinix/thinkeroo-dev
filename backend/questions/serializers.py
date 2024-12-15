from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

    def create(self, validated_data):
        return Question.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.answer = validated_data.get('answer', instance.answer)
        instance.type = validated_data.get('type', instance.type)
        instance.quiz_instance = validated_data.get('quiz_instance', instance.quiz_instance)  # Ensure quiz_instance is updated
        instance.save()
        return instance