from django.contrib import admin
from django.utils.html import format_html
from .models import Project, Education, Certification, Technology, Category, Company

admin.site.site_title = "Admin"
admin.site.site_header = "Admin Dashboard"
admin.site.index_title = "Dashboard"
admin.site.site_url = "/"


# Register your models here.

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "status", "visible")
    list_filter = ("status", "year", "categories")
    filter_horizontal = ["categories"]


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("title", "school", "gpa", "grade", "visible", "progress")
    list_filter = ("visible", "progress")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "exp", "visible", "progress")
    list_filter = ("company", "year", "visible", "progress")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "icon", "visible")
    list_filter = ("visible",)


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "visible")
    list_filter = ("category", "visible",)


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "logo")

    def logo(self, obj):
        if obj.logo_url:
            return format_html('<img src="{}" width="60" />', obj.logo_url)
        return "-"
