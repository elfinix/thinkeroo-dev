from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django.db import IntegrityError
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register_user(request):
    """Register a new user."""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            if 'unique constraint' in str(e):
                return Response({'error': 'Username or email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    """Authenticate a user with username or email."""
    identifier = request.data.get('identifier')
    password = request.data.get('password')
    
    # Use the custom authenticate method from UserManager
    user = User.objects.authenticate(identifier=identifier, password=password)
    
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'role': user.role}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def profile_user(request):
    """Retrieve the authenticated user's profile."""
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    return Response({"error": "Not authenticated"}, status=status.HTTP_403_FORBIDDEN)