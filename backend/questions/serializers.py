from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {
            'choice1': {'required': False, 'allow_null': True, 'allow_blank': True},
            'choice2': {'required': False, 'allow_null': True, 'allow_blank': True},
            'choice3': {'required': False, 'allow_null': True, 'allow_blank': True},
            'choice4': {'required': False, 'allow_null': True, 'allow_blank': True},
        }

    def create(self, validated_data):
        return Question.objects.create(**validated_data)