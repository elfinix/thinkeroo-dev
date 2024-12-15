from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import QuizQuestion
from .serializers import QuizQuestionSerializer
from django.shortcuts import render


@api_view(['GET', 'POST'])
def quiz_question_list(request):
    if request.method == 'GET':
        question_type = request.query_params.get('type', None)
        if question_type:
            questions = Question.objects.filter(type=question_type)
        else:
            questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def quiz_question_detail(request, pk):
    """Handle GET, PUT, and DELETE requests for a specific quiz-question."""
    try:
        quiz_question = QuizQuestion.objects.select_related('question_instance').get(pk=pk)
    except QuizQuestion.DoesNotExist:
        return Response({'error': 'Quiz-Question relationship not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuizQuestionSerializer(quiz_question)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = QuizQuestionSerializer(quiz_question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
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
    serializer = QuizQuestionSerializer(quiz_questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)