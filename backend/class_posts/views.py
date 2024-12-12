from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ClassPost
from .serializers import ClassPostSerializer

@api_view(['GET', 'POST'])
def class_post_list(request):
    """Handle GET (list) and POST (create) requests for class posts."""
    if request.method == 'GET':
        posts = ClassPost.objects.all()
        serializer = ClassPostSerializer(posts, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ClassPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def class_post_detail(request, pk):
    """Handle GET, PUT, and DELETE requests for a specific class post."""
    try:
        post = ClassPost.objects.get(pk=pk)
    except ClassPost.DoesNotExist:
        return Response({'error': 'ClassPost not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClassPostSerializer(post)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ClassPostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
