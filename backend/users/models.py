from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

# Create a custom manager for the User model
class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(username=username, email=email)
        user.set_password(password)  # Encrypt password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password)
        user.is_admin = True
        user.save(using=self._db)
        return user


# Define the custom User model
class User(AbstractBaseUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    role = models.CharField(max_length=10, choices=[('teacher', 'Teacher'), ('student', 'Student')], default='student')

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # Timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Set the manager for the user model
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # This makes email the unique identifier
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin  # Admins have all permissions

    def has_module_perms(self, app_label):
        return True  # Users have access to all modules
    
    class Meta:
        db_table = 'users_user'  # Specify the existing table name
