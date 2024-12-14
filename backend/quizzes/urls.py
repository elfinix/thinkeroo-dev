from django.urls import path
from . import views

urlpatterns = [
    path('', views.quiz_list, name='quiz_list'),  # List and Create quizzes
    path('<int:pk>/', views.quiz_detail, name='quiz_detail'),  # Retrieve, Update, Delete quiz
    path('class/<int:class_id>/', views.quizzes_by_class, name='quizzes_by_class'),
    path('question/<int:quiz_id>/', views.questions_by_quiz, name='questions_by_quiz'), 
    path('user/', views.user_quizzes, name='user_quizzes'), 
]
