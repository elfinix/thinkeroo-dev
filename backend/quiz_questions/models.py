from django.db import models
from quizzes.models import Quiz  # Assuming the Quiz model is in the 'quizzes' app
from questions.models import Question  # Assuming the Question model is in the 'questions' app

class QuizQuestion(models.Model):
    id = models.AutoField(primary_key=True)
    quiz_instance = models.ForeignKey(Quiz, on_delete=models.CASCADE, db_column='quiz_id')  # FK to Quiz
    question_instance = models.ForeignKey(Question, on_delete=models.CASCADE, db_column='question_id')  # FK to Question
    question_order = models.PositiveIntegerField()  # Order of questions in the quiz
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'quiz_question'  # Align with your existing DB table
        managed = False  # Prevent Django from managing the table
