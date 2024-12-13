from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_user_to_class, name='add_user_to_class'),
    path('', views.list_user_classes, name='list_user_classes'),
    path('<int:pk>/remove/', views.remove_user_from_class, name='remove_user_from_class'),
    
        path('total_students/<int:class_id>/', views.total_students_in_class, name='total_students_in_class'),
]
