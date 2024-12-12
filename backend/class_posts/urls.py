from django.urls import path
from . import views

urlpatterns = [
    path('', views.class_post_list, name='class_post_list'),  # List and Create
    path('<int:pk>/', views.class_post_detail, name='class_post_detail'),  # Retrieve, Update, Delete
]
