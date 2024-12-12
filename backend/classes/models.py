from django.db import models

class Class(models.Model):
    id = models.AutoField(primary_key=True)
    class_code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    class_limit = models.IntegerField()
    is_archived = models.BooleanField(default=False)
    archived_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    banner_img = models.ImageField(upload_to='class_banners/', null=True, blank=True)  # New field

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'class'  # Specify the existing table name
        managed = False     # Prevent Django from managing the table