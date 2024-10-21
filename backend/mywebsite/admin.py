from mywebsite.models import Course,Language,User,Quiz,Question,QuestionBlank,Teacher, CourseSection,Choice,UserLevel,Test,Article,Meet,Certificate,Category
from django.contrib import admin
from mywebsite.models import Participant


admin.site.register(Course)
admin.site.register(CourseSection)
admin.site.register(Language)
admin.site.register(User)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(QuestionBlank)
admin.site.register(Teacher)
admin.site.register(Choice)
admin.site.register(UserLevel)
admin.site.register(Test)
admin.site.register(Article)
admin.site.register(Meet)
admin.site.register(Certificate)
admin.site.register(Category)
admin.site.register(Participant)
