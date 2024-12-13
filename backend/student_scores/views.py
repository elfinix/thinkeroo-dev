from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response as DRFResponse
from rest_framework import status
from .models import StudentScore
from .serializers import StudentScoreSerializer

@api_view(['GET', 'POST'])
def student_score_list(request):
    """Handle GET (list) and POST (create) requests for student scores."""
    if request.method == 'GET':
        scores = StudentScore.objects.all()  # Retrieve all student scores
        serializer = StudentScoreSerializer(scores, many=True)
        return DRFResponse(serializer.data)

    if request.method == 'POST':
        serializer = StudentScoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return DRFResponse(serializer.data, status=status.HTTP_201_CREATED)
        return DRFResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def student_score_detail(request, pk):
    """Handle GET, PUT, and DELETE requests for a specific student score."""
    try:
        score = StudentScore.objects.get(pk=pk)
    except StudentScore.DoesNotExist:
        return DRFResponse({'error': 'Student score not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StudentScoreSerializer(score)
        return DRFResponse(serializer.data)

    if request.method == 'PUT':
        serializer = StudentScoreSerializer(score, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return DRFResponse(serializer.data)
        return DRFResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        score.delete()
        return DRFResponse(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def student_scores_by_quiz(request, quiz_id):
    """Retrieve student scores by quiz."""
    scores = StudentScore.objects.filter(quiz_instance=quiz_id).select_related('student_instance')
    data = [
        {
            'student_id': score.student_instance.id,
            'first_name': score.student_instance.first_name,
            'last_name': score.student_instance.last_name,
            'student_name': (score.student_instance.first_name + ' ' + score.student_instance.last_name),
            'score': score.total_score,
            'time_started': score.time_started,
            'time_taken': (score.time_finished - score.time_started).total_seconds() / 60
        }
        for score in scores
    ]
    return DRFResponse(data, status=status.HTTP_200_OK)