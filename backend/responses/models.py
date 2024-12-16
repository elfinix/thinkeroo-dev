from django.db import models
from questions.models import Question
from quizzes.models import Quiz
from users.models import User  # Assuming User model is in the 'users' app
from quiz_questions.models import QuizQuestion  # Assuming QuizQuestion model is in 'quiz_questions'

class QuizQuestion(models.Model):
    question_instance = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='responses_quizquestion_set'  # Unique related_name
    )
    quiz_instance = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name='responses_quizquestion_set'  # Unique related_name
    )
    # Add other fields as necessary

    def __str__(self):
        return f"{self.quiz_instance} - {self.question_instance}"
    
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
