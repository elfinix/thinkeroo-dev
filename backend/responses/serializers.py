from rest_framework import serializers
from .models import Response
from quiz_questions.models import QuizQuestion
from users.models import User

class ResponseSerializer(serializers.ModelSerializer):
    student_id = serializers.IntegerField(write_only=True)
    quiz_question_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Response
        fields = ['id', 'student_id', 'quiz_question_id', 'selected_option', 'is_correct']
        read_only_fields = ['is_correct']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        quiz_question_id = validated_data.pop('quiz_question_id')
        selected_option = validated_data.pop('selected_option')

        # Retrieve the User instance
        try:
            student_instance = User.objects.get(id=student_id)
        except User.DoesNotExist:
            raise serializers.ValidationError({'student_id': 'Invalid student ID.'})

        # Retrieve the QuizQuestion instance
        try:
            quiz_question_instance = QuizQuestion.objects.get(id=quiz_question_id)
        except QuizQuestion.DoesNotExist:
            raise serializers.ValidationError({'quiz_question_id': 'Invalid quiz question ID.'})

        # Determine if the selected option is correct
        correct_option = quiz_question_instance.question_instance.answer  # Adjust based on your Question model
        is_correct = (selected_option.strip().lower() == correct_option.strip().lower())

        # Create the Response instance
        response = Response.objects.create(
            student_instance=student_instance,
            quiz_question_instance=quiz_question_instance,
            selected_option=selected_option,
            is_correct=is_correct
        )
        return response