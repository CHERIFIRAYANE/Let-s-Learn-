from django.db import models
from django.utils import timezone
import json
from cloudinary_storage.storage import VideoMediaCloudinaryStorage,MediaCloudinaryStorage

class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30)
    family_name = models.CharField(max_length=30)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    profile_image = models.URLField(null=True, blank=True)
    image_url = models.URLField(null=True, blank=True)



    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "family_name"]

    def __str__(self):
        return self.email

class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    langue=models.ForeignKey('Language', on_delete=models.CASCADE)
    Descroption=models.CharField(max_length=100)

     
    

class Language(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='courses')
    quizzes = models.ForeignKey('Quiz', related_name='courses',on_delete=models.CASCADE)
    videofile= models.FileField(upload_to='videos/', blank=True, storage=VideoMediaCloudinaryStorage())
    level = models.IntegerField(blank=True)
    def __str__(self):
        return self.title
class CourseSection(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sections')


class Quiz(models.Model):
    title = models.CharField(max_length=100)
    

class QuestionBlank(models.Model):
    text = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE,related_name='questionblanks')
    answer=models.CharField(max_length=200)
    def __str__(self):
        return self.text

class Question(models.Model):
    text = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE,related_name='questions')

    def __str__(self):
        return self.text

class Choice(models.Model):
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,related_name='choices')

    def __str__(self):
        return self.text


class UserLevel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, blank=True, on_delete=models.CASCADE)
    
    
class Test(models.Model):
    
    language= models.ForeignKey('Language',on_delete=models.CASCADE)
    quizzes = models.ForeignKey('Quiz',on_delete=models.CASCADE)
    

class Meet(models.Model):
    title = models.CharField(max_length=200)
    meeting_time=models.DateTimeField()
    link=models.URLField()
    teacher=models.ForeignKey('Teacher',on_delete=models.CASCADE,related_name='meetteacher')
    Full_reserved=models.BooleanField(default=False)  
class Participant(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Certificate(models.Model):
    user=models.ForeignKey('User',on_delete=models.CASCADE)
    langue=models.ForeignKey('Language',on_delete=models.CASCADE)
    Type=models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.user.username} {self.langue}"
    
class Article(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    authorName = models.CharField(max_length=100)
    authorAvatar = models.ImageField(upload_to='images/', blank=True, storage=MediaCloudinaryStorage())
    cover = models.ImageField(upload_to='images/', blank=True, storage=MediaCloudinaryStorage())
    category = models.CharField(max_length=200)
class Category(models.Model):
    Name=models.CharField(max_length=20)

    def __str__(self):
        return self.Name 
    
    
#Test Quiz Question Module

class QuizQuestion(models.Model):
    question_text = models.CharField(max_length=255, null=True, blank=True)
    level = models.CharField(max_length=2)
    correct_answer_index = models.IntegerField(default=0, null=True, blank=True)  # Change the default value here
    language = models.CharField(max_length=2, blank=True)
    blank = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.question_text

class AnswerOption(models.Model):
    text = models.CharField(max_length=255)
    question = models.ForeignKey(QuizQuestion, related_name='answer_options', on_delete=models.CASCADE)

    def __str__(self):
        return self.text
