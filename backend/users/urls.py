from django.urls import path
from users import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('profile/', views.profile_user, name='profile'),
    path('get_user_id/', views.get_user_id, name='get_user_id'),
]
