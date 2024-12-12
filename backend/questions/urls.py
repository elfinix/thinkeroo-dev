from django.urls import path
from . import views

urlpatterns = [
    path('', views.question_list, name='question_list'),  # List and Create questions
    path('<int:pk>/', views.question_detail, name='question_detail'),  # Retrieve, Update, Delete question
]
