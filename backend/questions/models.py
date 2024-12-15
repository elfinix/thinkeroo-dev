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
    choice1 = models.TextField(null=True)  # Choice 1 for multiple choice questions
    choice2 = models.TextField(null=True)  # Choice 2 for multiple choice questions
    choice3 = models.TextField(null=True)  # Choice 3 for multiple choice questions
    choice4 = models.TextField(null=True)  # Choice 4 for multiple choice questions

    class Meta:
        db_table = 'question'
        managed = False  # Prevent Django from managing the table
