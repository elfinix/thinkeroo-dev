from django.urls import path
from users import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
]
