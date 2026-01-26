from django.urls import path
from . import views

from django.shortcuts import render

def custom_404_view(request, exception):
    return render(request, "404.html", status=404)

handler404 = custom_404_view

urlpatterns = [
    path('', views.index, name='index'),
]
