from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response as DRFResponse
from rest_framework import status
from .models import StudentScore
from responses.models import Response
from .serializers import StudentScoreSerializer
from responses.serializers import ResponseSerializer
from django.db import connection

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
@permission_classes([IsAuthenticated])
def student_quiz_result(request, quiz_id):
    """
    Retrieve the authenticated student's score and responses for a specific quiz.
    """
    user = request.user
    
    # Retrieve StudentScore
    try:
        student_score = StudentScore.objects.get(student_id=user.id, quiz_id=quiz_id)
    except StudentScore.DoesNotExist:
        return DRFResponse({'error': 'Quiz result not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    # Retrieve Responses
    responses = Response.objects.filter(student_id=user.id, quiz_question__quiz_id=quiz_id).select_related('quiz_question__question')
    response_serializer = ResponseSerializer(responses, many=True)
    
    data = {
        'total_score': student_score.total_score,
        'date_taken': student_score.date_taken,
        'responses': response_serializer.data
    }
    
    return DRFResponse(data, status=status.HTTP_200_OK)