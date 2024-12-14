from rest_framework import serializers
from quizzes.models import Quiz
from questions.models import Question
from classes.models import Class

class QuizSerializer(serializers.ModelSerializer):
    question_count = serializers.SerializerMethodField()
    class_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Quiz
        fields = '__all__'

    def create(self, validated_data):
        # implement additional logic for creating a quiz if needed
        return Quiz.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.schedule = validated_data.get('schedule', instance.schedule)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
    
    def get_question_count(self, obj):
        return Question.objects.filter(quiz_instance=obj).count()

    def get_class_name(self, obj):
        return obj.class_instance.name