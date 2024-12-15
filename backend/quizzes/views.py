from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from quizzes.models import Quiz
from quizzes.serializers import QuizSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def quiz_list(request):
    """Handle GET (list) and POST (create) requests for quizzes."""
    if request.method == 'GET':
        teacher_id = request.user.id
        quizzes = Quiz.objects.filter(teacher_id=teacher_id, status='active')  # Filter only active quizzes by teacher
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(teacher_id=request.user)  # Set the teacher_id to the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def quiz_detail(request, pk):
    """Handle GET, PUT, and DELETE requests for a specific quiz."""
    try:
        quiz = Quiz.objects.get(pk=pk)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = QuizSerializer(quiz, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        quiz.status = 'deleted'
        quiz.deleted_at = timezone.now()
        quiz.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def quizzes_by_class(request, class_id):
    """Retrieve quizzes by class."""
    quizzes = Quiz.objects.filter(class_instance=class_id)
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def questions_by_quiz(request, quiz_id):
    """Retrieve questions by quiz."""
    questions = Question.objects.filter (quiz_instance=quiz_id)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_quizzes(request):
    """Retrieve all quizzes of the authenticated user."""
    user = request.user
    quizzes = Quiz.objects.filter(teacher_id=user.id)
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

