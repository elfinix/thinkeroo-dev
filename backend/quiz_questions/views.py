from quizzes.serializers import QuizSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import QuizQuestion, Question, Quiz
from .serializers import QuizQuestionReadSerializer, QuestionSerializer, QuizQuestionWriteSerializer
from django.shortcuts import render


@api_view(['GET', 'POST'])
def quiz_question_list(request):
    if request.method == 'GET':
        # Use read serializer for listing
        quiz_questions = QuizQuestion.objects.all()
        serializer = QuizQuestionReadSerializer(quiz_questions, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Use write serializer for creation
        serializer = QuizQuestionWriteSerializer(data=request.data)
        if serializer.is_valid():
            quiz_question = serializer.save()
            read_serializer = QuizQuestionReadSerializer(quiz_question)
            return Response(read_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def quiz_question_detail(request, pk):
    try:
        quiz_question = QuizQuestion.objects.get(pk=pk)
    except QuizQuestion.DoesNotExist:
        return Response({'error': 'Quiz-Question relationship not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuizQuestionReadSerializer(quiz_question)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = QuizQuestionWriteSerializer(quiz_question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            read_serializer = QuizQuestionReadSerializer(quiz_question)
            return Response(read_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        quiz_question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_quizzes(request):
    """Retrieve all quizzes of the authenticated user."""
    user = request.user
    quizzes = Quiz.objects.filter(teacher_id=user.id)
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def questions_by_quiz(request, quiz_id):
    """Retrieve all questions for a specific quiz."""
    quiz_questions = QuizQuestion.objects.filter(quiz_instance_id=quiz_id).select_related('question_instance')
    serializer = QuizQuestionReadSerializer(quiz_questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)