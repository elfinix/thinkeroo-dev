from django.db import models
from classes.models import Class  # Assuming the Class model is in the 'classes' app
from users.models import User  # Assuming the User model is in the 'users' app

class Quiz(models.Model):
    id = models.AutoField(primary_key=True)
    teacher_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='teacher_id')  # ForeignKey to User
    class_instance = models.ForeignKey(Class, on_delete=models.CASCADE, db_column='class_id')  # ForeignKey to Class
    title = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.IntegerField()  # Duration in minutes
    schedule = models.DateTimeField()  # When the quiz is scheduled
    status = models.CharField(max_length=10, choices=[('active', 'Active'), ('closed', 'Closed'), ('deleted', 'Deleted')], default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)  # Soft delete field

    class Meta:
        db_table = 'quiz'
        managed = False  # Prevent Django from managing the table
