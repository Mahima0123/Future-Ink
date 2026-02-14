from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Letter
from .serializers import LetterSerializer, UserRegisterSerializer


# ---------- REGISTER ----------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]


# ---------- LETTER LIST + CREATE ----------
class LetterListCreateView(generics.ListCreateAPIView):
    serializer_class = LetterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # user only sees their letters
        return Letter.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # automatically attach logged-in user
        serializer.save(user=self.request.user)


# ---------- LETTER DETAIL ----------
class LetterRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = LetterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Letter.objects.filter(user=self.request.user)
