from rest_framework import serializers
from quizzes.serializers import QuizSerializer
from .models import QuizQuestion
from quizzes.models import Quiz
from questions.models import Question
from options.models import Option

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'teacher_id', 'class_instance', 'title', 'description', 'duration', 'schedule', 'status', 'deleted_at', 'created_at', 'updated_at', 'shows_results']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'content', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'quiz_instance', 'content', 'type', 'options']

    def create(self, validated_data):
        options_data = validated_data.pop('options')
        question = Question.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(question_instance=question, **option_data)
        return question

    def update(self, instance, validated_data):
        options_data = validated_data.pop('options')
        instance.content = validated_data.get('content', instance.content)
        instance.type = validated_data.get('type', instance.type)
        instance.save()

        # Update options
        for option_data in options_data:
            option_id = option_data.get('id')
            if option_id:
                option = Option.objects.get(id=option_id, question_instance=instance)
                option.content = option_data.get('content', option.content)
                option.is_correct = option_data.get('is_correct', option.is_correct)
                option.save()
            else:
                Option.objects.create(question_instance=instance, **option_data)

        return instance

class QuizQuestionSerializer(serializers.ModelSerializer):
    quiz_instance = QuizSerializer()
    question_instance = QuestionSerializer()

    class Meta:
        model = QuizQuestion
        fields = '__all__'