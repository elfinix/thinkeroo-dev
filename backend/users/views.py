from django.contrib.auth import update_session_auth_hash
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django.db import IntegrityError
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register_user(request):
    """Register a new user."""
    # Implementation here

@api_view(['POST'])
def login_user(request):
    """Authenticate a user with username or email."""
    # Implementation here

@api_view(['GET'])
def profile_user(request):
    """Retrieve the authenticated user's profile."""
    # Implementation here

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    user_id = request.user.id
    return Response({'user_id': user_id})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request, pk):
    """Retrieve the details of a user by their ID."""
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request, pk):
    """Update the details of a user by their ID."""
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get('currentPassword')
    new_password = request.data.get('newPassword')
    confirm_password = request.data.get('confirmPassword')

    if not user.check_password(current_password):
        return Response({"currentPassword": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

    if new_password != confirm_password:
        return Response({"confirmPassword": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()
    update_session_auth_hash(request, user)  # Important to keep the user logged in after password change

    return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    """Soft delete the authenticated user's account by setting is_active to False."""
    user = request.user
    user.is_active = False
    user.save()
    return Response({"detail": "Account deleted successfully"}, status=status.HTTP_200_OK)