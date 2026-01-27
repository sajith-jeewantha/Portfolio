from django.shortcuts import render
# from .data import icons
from .models import Project, Education, Certification, ProjectStatus, Category, Technology, TechnologyCategory


# Create your views here.

technology = { }

def index(request):
    categories = Category.objects.filter(visible=True)
    educations = Education.objects.filter(visible=True)
    projects = Project.objects.filter(visible=True).order_by('title')
    certifications = Certification.objects.filter(visible=True)

    for key, label in TechnologyCategory.choices:
        technology[key] = Technology.objects.filter(category=key, visible=True)

    return render(request, "index.html",
              {"technology": technology,
               "categories": categories,
               "projects": projects,
               "educations": educations,
               "certifications": certifications,
               "ProjectStatus": ProjectStatus})
