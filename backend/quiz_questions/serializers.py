from rest_framework import serializers
from .models import QuizQuestion
from quizzes.models import Quiz
from questions.models import Question

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class QuizQuestionSerializer(serializers.ModelSerializer):
    quiz_instance = QuizSerializer()
    question_instance = QuestionSerializer()

    class Meta:
        model = QuizQuestion
        fields = '__all__'