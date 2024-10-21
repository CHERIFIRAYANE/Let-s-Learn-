
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from mywebsite.models import *
from mywebsite.serializers import *
from .models import QuizQuestion
from mywebsite.serializers import QuizSerializer
from django.http import JsonResponse, Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,generics
from django.shortcuts import get_object_or_404 
from .models import *
from .serializers import *
from django.db.models import Max

from .models import Article
from .serializers import ArticleSerializer
from .models import *
from .serializers import *
from.models import Participant
from .serializers import ParticipantSerializer
from django.core.mail import send_mail

@api_view(['GET', 'POST'])
def User_View(request):
    if request.method == 'GET':
 
        data = User.objects.all()
        serializer = UserSerializer(data, many=True)
        return Response({'users': serializer.data})

    elif request.method == 'POST':

        # User doesn't exist, create a new account
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST','DELETE','PUT','PATCH'])
def user(request,email):
    try:
        data=User.objects.get(email=email)
        print(data)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
       serializer=UserSerializer(data)
       return Response({'user': serializer.data},status=200)
    elif (request.method =='DELETE') :
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method =='POST':
        serializer=UserSerializer(data,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'user':serializer.data})
    elif request.method =='PATCH':
        serializer=UserSerializer(data,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'user':serializer.data})
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'POST'])
def language_list(request):
    if request.method == 'GET':
        languages = Language.objects.all()
        serializer = LanguageSerializer(languages, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = LanguageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def getLanguages(request):
    if request.method == 'GET':
        languages = Language.objects.all()
        serializer = LanguageSerializer(languages, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = LanguageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#FOR THE DELETE 'SHOULD WE SEARCH BEFORE IF THERE IS COURSES RELATED TO THIS LANGUAGE
@api_view(['GET', 'PUT','DELETE'])
def getLanguage(request, pk):
    try:
        language = Language.objects.get(pk=pk)
    except Language.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = LanguageSerializer(language)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        language.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = LanguageSerializer(language, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#See how with frontend with language to use 
@api_view(['GET', 'POST'])
def getCourses(request):
    if request.method == 'GET':
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT','DELETE'])
def getCourse(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getCourseDetail(request,  language , level ):
    language_obj = get_object_or_404(Language, name=language)
    try:
        course = Course.objects.get(language=language_obj, level=level)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = CourseDetailSerializer(course)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def getQuizCourse(request,pk):
    try:
        quiz = Quiz.objects.get(pk=pk)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CourseQuizSerializer(quiz)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CourseQuizSerializer(quiz, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'PUT', 'PATCH'])
def getUserLevel(request, language , user ):
    user_obj = get_object_or_404(User, pk=user)
    language_obj = get_object_or_404(Language, name=language)
    if request.method == 'GET':
        try:
            user_level = UserLevel.objects.get(user=user_obj, language=language_obj)
        except UserLevel.DoesNotExist:
            course = Course.objects.get(language=language_obj, level = 1)
            user_level = UserLevel.objects.create(user=user_obj, language=language_obj, course=course)
            user_level.save()
        serializer = UserLevelSerializer(user_level)
        return Response(serializer.data)
    elif request.method == 'PUT' or request.method == 'PATCH':
        try:
            user_level = UserLevel.objects.get(user=user_obj, language=language_obj)
            course = Course.objects.get(language=language_obj, level = user_level.course.level + 1 )
            user_level.course = course
            user_level.save()
            #for the certification complete u?
           # Course.objects.all().aggregate(Max('level'))['level__max'])
        except UserLevel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserLevelSerializer(user_level)
        return Response(serializer.data)


#ARTICLE
@api_view(['GET', 'POST'])
def Article_list(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def Article_detail(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = ArticleSerializer(article, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#setting up the model for the Test Level Section

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def quiz_data(request, pk=None):
    if request.method == 'GET':
        quizzes = QuizQuestion.objects.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            quiz = QuizQuestion.objects.get(pk=pk)
        except QuizQuestion.DoesNotExist:
            return Response({'error': 'QuizQuestion not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = QuizSerializer(quiz, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            quiz = QuizQuestion.objects.get(pk=pk)
        except QuizQuestion.DoesNotExist:
            return Response({'error': 'QuizQuestion not found'}, status=status.HTTP_404_NOT_FOUND)

        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    
    
@api_view(['GET', 'POST'])
def Meet_View(request):
    if request.method == 'GET':
 
        data = Meet.objects.all()
        serializer = MeetSerializerR(data, many=True)
        return Response({'Meet': serializer.data})

    elif request.method == 'POST':
        serializer = MeetSerializerW(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Meet': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def Participant_View(request):
    if request.method == 'GET':
 
        data = Participant.objects.all()
        serializer = ParticipantSerializer(data, many=True)
        return Response({'Participants': serializer.data})

    elif request.method == 'POST':

        # User doesn't exist, create a new account
        serializer = ParticipantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Participant': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
@api_view(['POST'])
def send_email(request):
    data = request.data
    to_email = data.get('to')
    subject = data.get('subject')
    message = data.get('message')

    if to_email and subject and message:
        try:
            send_mail(
                subject,
                message,
                'speakifiplatform@gmail.com',  # Replace with your sending email address
                [to_email],
                fail_silently=False,
            )
            return Response({'message': 'Email sent successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Incomplete data'}, status=400)
    
@api_view(['PATCH', 'DELETE'])
def editmeet(request, id):
    try:
        instance = Meet.objects.get(id=id)
    except YourModel.DoesNotExist:
        return Response({"message": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PATCH':
        serializer = MeetSerializerW(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
