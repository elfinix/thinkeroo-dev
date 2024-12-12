from django.db import models
from users.models import User  # Assuming User model is in the 'users' app
from quiz_questions.models import QuizQuestion  # Assuming QuizQuestion model is in 'quiz_questions'

class Response(models.Model):
    id = models.AutoField(primary_key=True)
    student_instance = models.ForeignKey(User, on_delete=models.CASCADE, db_column='student_id')  # FK to User
    quiz_question_instance = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, db_column='quiz_question_id')  # FK to QuizQuestion
    selected_option = models.TextField()  # User's selected answer
    is_correct = models.BooleanField()  # Whether the response was correct
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'response'  # Align with your existing DB table
        managed = False  # Prevent Django from managing the table
