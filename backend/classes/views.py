from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Class
from .serializers import ClassSerializer

@api_view(['POST'])
def create_class(request):
    """Create a new class."""
    serializer = ClassSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_classes(request):
    """List all classes."""
    classes = Class.objects.all()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_class(request, pk):
    """Retrieve a specific class."""
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = ClassSerializer(class_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_class(request, pk):
    """Update a class."""
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = ClassSerializer(class_instance, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_class(request, pk):
    """Delete a class."""
    try:
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
    class_instance.delete()
    return Response({"message": "Class deleted successfully"}, status=status.HTTP_200_OK)