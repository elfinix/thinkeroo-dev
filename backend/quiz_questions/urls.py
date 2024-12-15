from django.urls import path
from . import views

urlpatterns = [
    path('', views.quiz_question_list, name='quiz_question_list'),  # List and Create all quiz-questions
    path('<int:pk>/', views.quiz_question_detail, name='quiz_question_detail'),  # Retrieve, Update, Delete a specific quiz-question
    path('quiz/<int:quiz_id>/', views.questions_by_quiz, name='questions_by_quiz'),  # List quiz-questions for a specific quiz
]