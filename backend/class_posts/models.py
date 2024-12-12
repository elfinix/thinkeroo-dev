from django.db import models
from users.models import User
from classes.models import Class

class ClassPost(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    class_instance = models.ForeignKey(Class, on_delete=models.CASCADE, db_column='class_id')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'class_post'
        managed = False  # Prevent Django from managing the table
