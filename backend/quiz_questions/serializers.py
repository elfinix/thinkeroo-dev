from rest_framework import serializers
from quizzes.serializers import QuizSerializer
from .models import QuizQuestion
from quizzes.models import Quiz
from questions.models import Question
from options.models import Option

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'content', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'content', 'type', 'options']  # Include options field

class QuizQuestionSerializer(serializers.ModelSerializer):
    quiz_instance = QuizSerializer()
    question_instance = QuestionSerializer()

    class Meta:
        model = QuizQuestion
        fields = '__all__'