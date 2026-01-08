from django.shortcuts import render
from .data import icons, expertise

# Create your views here.


def index(request):
    return render(request, "index.html", {"icons": icons, "expertise": expertise})



