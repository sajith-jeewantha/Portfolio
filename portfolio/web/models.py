from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.timezone import now
from colorfield.fields import ColorField


# Create your models here.

def validate_image_url(value):
    if not value.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".svg")):
        raise ValidationError("URL must point to an image")


class TechnologyCategory(models.TextChoices):
    PROGRAMMING_LANGUAGES = "Programming Languages", "Programming Languages"
    TECHNOLOGIES_AND_FRAMEWORKS = "Technologies and Frameworks", "Technologies and Frameworks"
    DATABASES = "Databases", "Databases"
    CLOUD_PLATFORMS = "Cloud Platforms", "Cloud Platforms"
    VERSION_CONTROL = "Version Control", "Version Control"


class Technology(models.Model):
    name = models.CharField(max_length=20)
    category = models.CharField(choices=TechnologyCategory.choices,)
    url = models.URLField(max_length=500, validators=[validate_image_url])
    visible = models.BooleanField(default=True)

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
    gpa = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)], blank=True, null=True)
    grade = models.CharField(max_length=30, choices=GradeChoices.choices, default=GradeChoices.FIRST_CLASS_HONORS)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Certification(models.Model):
    title = models.CharField(max_length=200)
    issued_by = models.CharField(max_length=100)
    description = models.TextField()
    year = models.IntegerField()
    exp = models.IntegerField()
    url = models.URLField(max_length=500)
    visible = models.BooleanField(default=True)

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
    gradient_from = ColorField(default="#3b82f6")
    gradient_to = ColorField(default="#2563eb")
    icon_class = models.CharField(max_length=50, default="fa-laptop")
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title
