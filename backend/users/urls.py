from django.urls import path
from users import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('profile/', views.profile_user, name='profile'),
    path('get_user_id/', views.get_user_id, name='get_user_id'),
    path('user/<int:pk>/', views.user_detail, name='user_detail'),  # New URL pattern
    path('user/<int:pk>/update/', views.update_user_profile, name='update_user_profile'),  # New URL pattern
    path('change_password/', views.change_password, name='change_password'),  # New URL pattern
    path('delete_account/', views.delete_account, name='delete_account'),  # New URL pattern
]
