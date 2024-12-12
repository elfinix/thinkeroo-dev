from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Option
from .serializers import OptionSerializer

@api_view(['GET', 'POST'])
def option_list(request):
    """Handle GET (list) and POST (create) requests for options."""
    if request.method == 'GET':
        options = Option.objects.all()  # Retrieve all options
        serializer = OptionSerializer(options, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = OptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def option_detail(request, pk):
    """Handle GET, PUT, and DELETE requests for a specific option."""
    try:
        option = Option.objects.get(pk=pk)
    except Option.DoesNotExist:
        return Response({'error': 'Option not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OptionSerializer(option)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = OptionSerializer(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
