from django.urls import path
from .views import LetterListCreateView, LetterRetrieveUpdateView, RegisterView

urlpatterns = [
    path('letters/', LetterListCreateView.as_view(), name='letters-list-create'),
    path('letters/<int:pk>/', LetterRetrieveUpdateView.as_view(), name='letters-detail'),
    path('register/', RegisterView.as_view(), name='register'),

]
