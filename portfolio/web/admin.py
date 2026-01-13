from django.contrib import admin

from .models import Project, Education, Certification, Technology

# Register your models here.

admin.site.register(Project)
admin.site.register(Education)
admin.site.register(Certification)
admin.site.register(Technology)

admin.site.site_title = "Admin"
admin.site.site_header = "Admin Dashboard"
admin.site.index_title = "Dashboard"
admin.site.site_url = "/"