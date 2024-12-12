from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response as DRFResponse
from rest_framework import status
from .models import Response
from .serializers import ResponseSerializer

@api_view(['GET', 'POST'])
def response_list(request):
    """Handle GET (list) and POST (create) requests for responses."""
    if request.method == 'GET':
        responses = Response.objects.all()  # Retrieve all response records
        serializer = ResponseSerializer(responses, many=True)
        return DRFResponse(serializer.data)

    if request.method == 'POST':        # Create a new response record
        serializer = ResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return DRFResponse(serializer.data, status=status.HTTP_201_CREATED)
        return DRFResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def response_detail(request, pk):
    """Handle GET, PUT, and DELETE requests for a specific response."""
    try:
        response = Response.objects.get(pk=pk)
    except Response.DoesNotExist:
        return DRFResponse({'error': 'Response not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':     # Retrieve a specific response record
        serializer = ResponseSerializer(response)
        return DRFResponse(serializer.data)

    if request.method == 'PUT':     # Update a specific response record
        serializer = ResponseSerializer(response, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return DRFResponse(serializer.data)
        return DRFResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':  # Delete a specific response record
        response.delete()
        return DRFResponse(status=status.HTTP_204_NO_CONTENT)
