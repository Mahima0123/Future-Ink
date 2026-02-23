from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.utils import timezone

from .models import Letter
from .serializers import (
    LetterSerializer,
    UserRegisterSerializer,
)


# ---------- REGISTER ----------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

# ---------- LOGOUT ----------
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_205_RESET_CONTENT
            )

        except Exception:
            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST
            )


# ---------- LETTER LIST + CREATE ----------
class LetterListCreateView(generics.ListCreateAPIView):
    serializer_class = LetterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        now = timezone.now()

        # ✅ AUTO UPDATE UNLOCK STATUS
        Letter.objects.filter(
            user=self.request.user,
            unlock_at__lte=now,
            unlocked=False
        ).update(unlocked=True)

        # ✅ RETURN ONLY LOCKED LETTERS (future letters)
        return Letter.objects.filter(
            user=self.request.user,
            unlocked=False
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UnlockedLettersView(generics.ListAPIView):
    serializer_class = LetterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Letter.objects.filter(
            user=self.request.user,
            unlocked=True
        ).order_by("-unlock_at")

# ---------- LETTER DETAIL ----------
class LetterRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = LetterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Letter.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        letter = self.get_object()
        now = timezone.now()

        # ✅ Auto unlock check
        if letter.unlock_at <= now and not letter.unlocked:
            letter.unlocked = True
            letter.save()

        # ❌ Prevent reflection/mood before unlock
        if not letter.unlocked:
            if "reflection" in request.data or "mood" in request.data:
                return Response(
                    {"error": "Letter is still locked."},
                    status=status.HTTP_403_FORBIDDEN
                )

        return super().update(request, *args, **kwargs)
