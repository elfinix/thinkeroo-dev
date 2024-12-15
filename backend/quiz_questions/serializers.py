# serializers.py
from rest_framework import serializers
from .models import QuizQuestion
from questions.serializers import QuestionSerializer

class QuizQuestionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['quiz_instance', 'question_instance', 'question_order']

class QuizQuestionReadSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(source='question_instance', read_only=True)

    class Meta:
        model = QuizQuestion
        fields = [
            'id',
            'quiz_instance',
            'question_instance',
            'question_order',
            'created_at',
            'updated_at',
            'question',
        ]