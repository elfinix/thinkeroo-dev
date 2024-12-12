from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import QuizQuestion
from .serializers import QuizQuestionSerializer

@api_view(['GET', 'POST'])
def quiz_question_list(request):
    """Handle GET (list) and POST (create) requests for quiz-questions."""
    if request.method == 'GET':
        quiz_questions = QuizQuestion.objects.all()  # Retrieve all quiz-question records
        serializer = QuizQuestionSerializer(quiz_questions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = QuizQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def quiz_question_detail(request, pk):
    """Handle GET, PUT, and DELETE requests for a specific quiz-question."""
    try:
        quiz_question = QuizQuestion.objects.get(pk=pk)
    except QuizQuestion.DoesNotExist:
        return Response({'error': 'Quiz-Question relationship not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuizQuestionSerializer(quiz_question)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = QuizQuestionSerializer(quiz_question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        quiz_question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
