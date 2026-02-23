from django.urls import path
from .views import (
    LetterListCreateView,
    LetterRetrieveUpdateView,
    UnlockedLettersView,
    RegisterView,
    LogoutView,
)

urlpatterns = [
    path('letters/', LetterListCreateView.as_view(), name='letters-list-create'),
    path('letters/<int:pk>/', LetterRetrieveUpdateView.as_view(), name='letters-detail'),
    path("letters/unlocked/", UnlockedLettersView.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
