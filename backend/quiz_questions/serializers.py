from rest_framework import serializers
from .models import QuizQuestion
from questions.models import Question
from questions.serializers import QuestionSerializer

class QuizQuestionSerializer(serializers.ModelSerializer):
    # For write operations: accept question_instance as an ID
    question_instance = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all()
    )
    # For read operations: include detailed question data
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
            'question',  # Nested question data
        ]