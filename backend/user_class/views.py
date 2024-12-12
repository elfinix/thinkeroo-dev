from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserClass
from .serializers import UserClassSerializer

@api_view(['POST'])
def add_user_to_class(request):
    """Add a user to a class."""
    serializer = UserClassSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_user_classes(request):
    """List all user-class relationships."""
    user_classes = UserClass.objects.all()
    serializer = UserClassSerializer(user_classes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def remove_user_from_class(request, pk):
    """Remove a user from a class."""
    try:
        user_class = UserClass.objects.get(pk=pk)
        user_class.delete()
        return Response({"message": "User removed from class successfully"}, status=status.HTTP_200_OK)
    except UserClass.DoesNotExist:
        return Response({"error": "UserClass entry not found"}, status=status.HTTP_404_NOT_FOUND)
