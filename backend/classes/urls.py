from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_class, name='create_class'),
    path('', views.list_classes, name='list_classes'),
    path('<int:pk>/', views.get_class, name='get_class'),
    path('<int:pk>/update/', views.update_class, name='update_class'),
    path('<int:pk>/delete/', views.delete_class, name='delete_class'),
    path('archive_class/<int:pk>/', views.archive_class, name='archive_class'),
    path('archived/', views.archived_classes, name='archived_classes'),  # List archived classes
    path('unarchive_class/<int:pk>/', views.unarchive_class, name='unarchive_class'),  # Unarchive class
    path('user_class_quizzes/', views.user_class_quizzes, name='user_class_quizzes'),  # New URL pattern
]
