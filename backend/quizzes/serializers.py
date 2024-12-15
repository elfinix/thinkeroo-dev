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
        return Quiz.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.class_instance = validated_data.get('class_instance', instance.class_instance)  # Ensure class_instance is updated
        instance.description = validated_data.get('description', instance.description)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.schedule = validated_data.get('schedule', instance.schedule)
        instance.status = validated_data.get('status', instance.status)
        instance.shows_results = validated_data.get('shows_results', instance.shows_results)
        instance.save()
        return instance

    def get_question_count(self, obj):
        return Question.objects.filter(quiz_instance=obj).count()

    def get_class_name(self, obj):
        return obj.class_instance.name