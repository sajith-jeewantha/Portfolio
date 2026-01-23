from django.shortcuts import render
from .data import icons
from .models import Project, Education, Certification, ProjectStatus, Category


# Create your views here.

def index(request):
    categories = Category.objects.filter(visible=True)
    educations = Education.objects.filter(visible=True)
    projects = Project.objects.filter(visible=True).order_by('title')
    certifications = Certification.objects.filter(visible=True)

    return render(request, "index.html",
                  {"icons": icons,
                   "categories": categories,
                   "projects": projects,
                   "educations": educations,
                   "certifications": certifications,
                   "ProjectStatus": ProjectStatus})
