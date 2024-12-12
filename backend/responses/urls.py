from django.urls import path
from . import views

urlpatterns = [
    path('', views.response_list, name='response_list'),  # List and Create responses
    path('<int:pk>/', views.response_detail, name='response_detail'),  # Retrieve, Update, Delete response
]
