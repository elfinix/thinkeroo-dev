from django.db import models
from users.models import User
from classes.models import Class

class UserClass(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    class_instance = models.ForeignKey(Class, on_delete=models.CASCADE, db_column='class_id')
    join_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=[('active', 'Active'), ('removed', 'Removed')], default='active')

    class Meta:
        db_table = 'user_class'
        managed = False  # Ensures Django does not try to recreate the table
