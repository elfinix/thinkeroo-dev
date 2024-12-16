from django.urls import path
from . import views

urlpatterns = [
    path('', views.student_score_list, name='student_score_list'),  # List and Create student scores
    path('<int:pk>/', views.student_score_detail, name='student_score_detail'),  # Retrieve, Update, Delete student score
    path('quiz-results/<int:quiz_id>/', views.student_quiz_result, name='student_quiz_result'),
]
