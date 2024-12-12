from django.db import models
from quizzes.models import Quiz  # Assuming the Quiz model is in the 'quizzes' app

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    quiz_instance = models.ForeignKey(Quiz, on_delete=models.CASCADE, db_column='quiz_id')  # ForeignKey to Quiz
    content = models.TextField()  # The actual question content
    answer = models.TextField()  # The correct answer
    type = models.CharField(max_length=3, choices=[('MC', 'Multiple Choice'), ('TF', 'True/False'), ('IDN', 'Identification')], default='MC')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'question'
        managed = False  # Prevent Django from managing the table
