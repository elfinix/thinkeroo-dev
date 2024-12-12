from django.urls import path
from . import views

urlpatterns = [
    path('', views.option_list, name='option_list'),  # List and Create options
    path('<int:pk>/', views.option_detail, name='option_detail'),  # Retrieve, Update, Delete option
]
