from .models import Class
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserClass
from .serializers import UserClassSerializer
from django.db.models import Prefetch

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

@api_view(['GET'])
def total_students_in_class(_, class_id):
    """Retrieve the total number of students in a class."""
    total_students = UserClass.objects.filter(class_instance=class_id).count()
    return Response({'total_students': total_students}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_students_in_class(request, class_id):
    """List all students in a specific class."""
    user_classes = UserClass.objects.filter(class_instance=class_id).select_related('user')
    students = [{"first_name": uc.user.first_name, "last_name": uc.user.last_name} for uc in user_classes]
    return Response(students, status=status.HTTP_200_OK)
