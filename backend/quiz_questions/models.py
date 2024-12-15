from django.db import models
from quizzes.models import Quiz
from questions.models import Question

class QuizQuestion(models.Model):
    id = models.AutoField(primary_key=True)
    quiz_instance = models.ForeignKey(Quiz, on_delete=models.CASCADE, db_column='quiz_id')
    question_instance = models.ForeignKey(Question, on_delete=models.CASCADE, db_column='question_id')
    question_order = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'quiz_question'
        managed = False  # Prevent Django from managing the table
        