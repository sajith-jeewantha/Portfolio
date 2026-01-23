from django.contrib import admin

from .models import Project, Education, Certification, Technology, Category, Tag

admin.site.site_title = "Admin"
admin.site.site_header = "Admin Dashboard"
admin.site.index_title = "Dashboard"
admin.site.site_url = "/"


# Register your models here.

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "status", "visible")
    list_filter = ("status", "year", "categories")
    filter_horizontal = ("categories", "tag")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("title", "school", "gpa", "grade", "visible")
    list_filter = ("visible",)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issued_by", "year", "exp", "visible")
    list_filter = ("issued_by", "year", "visible",)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "icon", "visible")
    list_filter = ("visible",)


admin.site.register(Technology)
admin.site.register(Tag)
