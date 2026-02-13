from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Letter
from .serializers import LetterSerializer, UserRegisterSerializer
from django.contrib.auth.models import User
from rest_framework import generics, permissions


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]


class LetterListCreateView(generics.ListCreateAPIView):
    serializer_class = LetterSerializer

    def get_queryset(self):
        return Letter.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LetterRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = LetterSerializer

    def get_queryset(self):
        return Letter.objects.filter(user=self.request.user)


# Only logged-in users can access letters
class LetterListCreateView(generics.ListCreateAPIView):
    serializer_class = LetterSerializer
    permission_classes = [permissions.AllowAny] 

    def get_queryset(self):
        return Letter.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class LetterRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = LetterSerializer
    permission_classes = [permissions.AllowAny] 

    def get_queryset(self):
        return Letter.objects.filter(user=self.request.user)
