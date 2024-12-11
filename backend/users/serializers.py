from rest_framework import serializers
from .models import User  # Make sure to import your User model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'institution', 'profile_picture', 'role']

    def create(self, validated_data):
        # You might need to hash the password before saving the user
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user
