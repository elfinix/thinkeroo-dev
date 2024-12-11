from django.shortcuts import render
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from users.models import User

# Define a serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'role']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# Registration API view
@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
