from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.timezone import now
from colorfield.fields import ColorField


# Create your models here.

def validate_image_url(value):
    if not value.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".svg")):
        raise ValidationError("URL must point to an image")


class Stack(models.Model):
    name = models.CharField(max_length=20)
    url = models.URLField(max_length=500, validators=[validate_image_url])

    def __str__(self):
        return self.name


class GradeChoices(models.TextChoices):
    FIRST_CLASS_HONORS = "First Class Honors", "First Class Honors"
    SECOND_UPPER_CLASS_HONORS = "Second Upper Class Honors", "Second Upper Class Honors"
    SECOND_LOWER_CLASS_HONORS = "Second Lower Class Honors", "Second Lower Class Honors"
    THIRD_CLASS_HONORS = "Third Class Honors", "Third Class Honors"


class Education(models.Model):
    title = models.CharField(max_length=200)
    school = models.CharField(max_length=200)
    description = models.TextField()
    start_year = models.IntegerField(validators=[MinValueValidator(2000)])
    end_year = models.IntegerField(validators=[MinValueValidator(2000)], blank=True, null=True)
    gpa = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    grade = models.CharField(max_length=30, choices=GradeChoices.choices, default=GradeChoices.FIRST_CLASS_HONORS)

    def __str__(self):
        return self.title


class Certification(models.Model):
    title = models.CharField(max_length=200)
    issued_by = models.CharField(max_length=100)
    description = models.TextField()
    year = models.IntegerField()
    exp = models.IntegerField()
    url = models.URLField(max_length=500)

    def __str__(self):
        return self.title


class ProjectStatus(models.TextChoices):
    COMPLETED = "Completed", "Completed"
    IN_PROGRESS = "In Progress", "In Progress"
    PUBLISHED = "Published", "Published"

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    year = models.IntegerField(validators=[MinValueValidator(2000)])
    github = models.URLField(max_length=500, blank=True, null=True)
    website = models.URLField(max_length=500, blank=True, null=True)
    tech = models.JSONField(default=list)
    status = models.CharField(max_length=20, choices=ProjectStatus.choices, default=ProjectStatus.IN_PROGRESS)
    visible = models.BooleanField(default=True)
    gradient_from = ColorField(default="#3b82f6")
    gradient_to = ColorField(default="#2563eb")
    icon_class = models.CharField(max_length=50, default="fa-laptop")

    def __str__(self):
        return self.title
