from user_class.serializers import UserClassSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import UserClass
from classes.models import Class
from classes.serializers import ClassSerializer

@api_view(['POST'])
def add_user_to_class(request):
    """Add a user to a class."""
    serializer = UserClassSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_classes(request):
    """List all classes that belong to the authenticated user."""
    user = request.user
    user_classes = UserClass.objects.filter(user=user, status='active').select_related('class_instance')
    classes = [uc.class_instance for uc in user_classes]
    serializer = ClassSerializer(classes, many=True)
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
    total_students = UserClass.objects.filter(class_instance=class_id, status='active').count()
    return Response({'total_students': total_students}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_students_in_class(_, class_id):
    """List all students in a specific class."""
    user_classes = UserClass.objects.filter(class_instance=class_id, status='active').select_related('user')
    students = [{"id": uc.user.id, "first_name": uc.user.first_name, "last_name": uc.user.last_name, "join_date": uc.join_date} for uc in user_classes]
    return Response(students, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_user_status(request, user_id, class_id):
    """Update the status of a user in a class."""
    try:
        user_class = UserClass.objects.get(user_id=user_id, class_instance=class_id)
    except UserClass.DoesNotExist:
        return Response({"error": "UserClass entry not found"}, status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get('status')
    if new_status not in ['active', 'suspended', 'removed']:
        return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

    user_class.status = new_status
    user_class.save()
    return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)