"""
URL configuration for mywebsite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', views.Article_list),
    path('articles/<int:pk>/', views.Article_detail),
    path('api/languages/', views.language_list, name='language-list'),
    path('api/users/', views.User_View, name='Users-list'),
    path('api/user/<str:email>', views.user, name='User'),
    path('quizData/', views.quiz_data, name='quiz_data'),
    path('quizData/<int:pk>/', views.quiz_data),
    path('api/meets/', views.Meet_View,name='Meets-list'),
    path('languages/', views.getLanguages),
    path('languages/<int:pk>/', views.getLanguage),
  
    path('courses/', views.getCourses),
    path('course/<int:pk>/', views.getCourse),
    path('course/<str:language>/<int:level>/', views.getCourseDetail),

    path('quiz/<int:pk>/', views.getQuizCourse),

    path('userlevel/<str:language>/<int:user>/', views.getUserLevel),
    path('api/meets/<int:pk>/', views.editmeet,name='Meets-list'),



    
    
    


    
]
