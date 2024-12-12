from django.urls import path
from . import views

urlpatterns = [
    path('', views.quiz_list, name='quiz_list'),  # List and Create quizzes
    path('<int:pk>/', views.quiz_detail, name='quiz_detail'),  # Retrieve, Update, Delete quiz
]
