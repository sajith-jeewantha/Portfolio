from django.shortcuts import render
from .data import icons
from .models import Project, Education, Certification, ProjectStatus


# Create your views here.

def index(request):
    projects = Project.objects.filter(visible=True).order_by('title')
    educations = Education.objects.filter(visible=True)
    certifications = Certification.objects.filter(visible=True)
    return render(request, "index.html",
                  {"icons": icons,
                   "projects": projects,
                   "educations": educations,
                   "certifications": certifications,
                   "ProjectStatus": ProjectStatus})
