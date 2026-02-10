from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from urllib.parse import urlparse


# Create your models here.

def validate_image_url(value):
    path = urlparse(value).path.lower()
    if not path.endswith((".png", ".jpg", ".jpeg", ".webp", ".svg")):
        raise ValidationError("URL must point to an image (.png, .jpg, .jpeg, .webp, .svg)")


class TechnologyCategory(models.TextChoices):
    PROGRAMMING_LANGUAGES = "programming_languages", "Programming Languages"
    TECHNOLOGIES_AND_FRAMEWORKS = "technologies_and_frameworks", "Technologies and Frameworks"
    DATABASES = "databases", "Databases"
    CLOUD_PLATFORMS = "cloud_platforms", "Cloud Platforms"
    VERSION_CONTROL = "version_control", "Version Control"
    CSS_FRAMEWORKS = "css_frameworks", "CSS Frameworks"


class Technology(models.Model):
    name = models.CharField(max_length=80)
    category = models.CharField(max_length=45, choices=TechnologyCategory.choices)
    url = models.URLField(max_length=500, validators=[validate_image_url])
    visible = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["name", "category"], name="unique_tech_per_category")
        ]

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
    start_year = models.IntegerField(validators=[MinValueValidator(2000)], blank=True, null=True)
    end_year = models.IntegerField(validators=[MinValueValidator(2000)], blank=True, null=True)
    gpa = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)], blank=True, null=True)
    grade = models.CharField(max_length=30, choices=GradeChoices.choices, blank=True, null=True)
    progress = models.BooleanField(default=False)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Company(models.Model):
    name = models.CharField(max_length=200, unique=True)
    logo_url = models.URLField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.name


class Certification(models.Model):
    title = models.CharField(max_length=200)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True,
                                related_name="certifications", )
    description = models.TextField()
    year = models.IntegerField(blank=True, null=True)
    exp = models.IntegerField(blank=True, null=True)
    url = models.URLField(max_length=500)
    progress = models.BooleanField(default=False)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class ProjectStatus(models.TextChoices):
    COMPLETED = "Completed", "Completed"
    IN_PROGRESS = "In Progress", "In Progress"
    PUBLISHED = "Published", "Published"


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    icon = models.CharField(max_length=50)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    year = models.IntegerField(validators=[MinValueValidator(2000)])
    github = models.URLField(max_length=500, blank=True, null=True)
    website = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, choices=ProjectStatus.choices, default=ProjectStatus.IN_PROGRESS)
    icon_class = models.CharField(max_length=50, default="fa-laptop")
    features = models.TextField(blank=True, default="")
    tags = models.TextField(blank=True, default="")
    visible = models.BooleanField(default=True)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return self.title
