from django.db import models
from users.models import User  # Assuming User model is in 'users' app
from quizzes.models import Quiz  # Assuming Quiz model is in 'quizzes' app

class StudentScore(models.Model):
    id = models.AutoField(primary_key=True)
    student_instance = models.ForeignKey(User, on_delete=models.CASCADE, db_column='student_id')  # FK to User
    quiz_instance = models.ForeignKey(Quiz, on_delete=models.CASCADE, db_column='quiz_id')  # FK to Quiz
    total_score = models.IntegerField()  # Total score of the student
    time_started = models.DateTimeField()  # Date the quiz was taken
    created_at = models.DateTimeField(auto_now_add=True)  # Record creation timestamp
    updated_at = models.DateTimeField(auto_now=True)  # Record update timestamp
    time_finished = models.DateTimeField()  # New field for time taken

    class Meta:
        db_table = 'student_score'  # Align with the existing DB table
        managed = False  # Prevent Django from managing the table
