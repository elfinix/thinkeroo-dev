from django.db import models
from questions.models import Question  # Assuming the Question model is in the 'questions' app

class Option(models.Model):
    id = models.AutoField(primary_key=True)
    question_instance = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options', db_column='question_id')  # ForeignKey to Question
    content = models.TextField()  # The text of the option
    is_correct = models.BooleanField(default=False)  # Indicates if this option is correct
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'option'
        managed = False  # Prevent Django from managing the table
