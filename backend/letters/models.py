from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Letter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='letters')
    title = models.CharField(max_length=200, blank=True)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    unlock_at = models.DateTimeField()
    unlocked = models.BooleanField(default=False)
    reflection = models.TextField(blank=True)
    mood = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.title or 'Untitled'} by {self.user.username}"
