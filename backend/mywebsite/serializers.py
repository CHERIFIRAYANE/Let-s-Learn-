from rest_framework import serializers
from .models import *
from .models import Article, Course, QuizQuestion,AnswerOption
from .models import User
from .models import Meet
from .models import Teacher
from .models import Language
from .models import Participant

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'description', 'createdAt', 'authorName', 'authorAvatar', 'cover', 'category']


class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerOption
        fields = ['text']

class QuizSerializer(serializers.ModelSerializer):
    answer_options = AnswerOptionSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = QuizQuestion
        fields = ['id', 'language', 'level', 'question_text', 'answer_options', 'correct_answer_index', 'blank']

    def create(self, validated_data):
        answer_options_data = validated_data.pop('answer_options', None)
        question = QuizQuestion.objects.create(**validated_data)
        if answer_options_data is not None:
            for answer_option_data in answer_options_data:
                AnswerOption.objects.create(question=question, **answer_option_data)
        return question
    def update(self, instance, validated_data):
        answer_options_data = validated_data.pop('answer_options', None)
        instance = super().update(instance, validated_data)
        if answer_options_data is not None:
            instance.answer_options.all().delete()
            for answer_option_data in answer_options_data:
                AnswerOption.objects.create(question=instance, **answer_option_data)
        return instance
    
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['name']
        

class CourseSerializer1(serializers.ModelSerializer):
    language = LanguageSerializer(read_only=True)
    class Meta:
        model = Course
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'family_name', 'image_url','profile_image']

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    langue=LanguageSerializer()
    class Meta:
        model = Teacher
        fields = ['user','langue','Descroption']

class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Participant
        fields = ('user',)
        
class MeetSerializerW(serializers.ModelSerializer):

    teacher = serializers.CharField(write_only=True)

    class Meta:
        model = Meet
        fields = ['title', 'meeting_time', 'link', 'teacher']

    def create(self, validated_data):
        teacher = validated_data.pop('teacher')
        user_instance = User.objects.get(email=teacher)
        validated_data['teacher'] = Teacher.objects.get(user=user_instance)
        meet_instance = Meet.objects.create(**validated_data)
        return meet_instance
class MeetSerializerR(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    teacher = TeacherSerializer(Teacher)

    class Meta:
        model = Meet
        fields = ['id','title', 'meeting_time', 'link', 'teacher',   'participants', 'Full_reserved']

    def get_participants(self, obj):
        participants = Participant.objects.filter(meet=obj)
        participant_emails = {participant.user.email for participant in participants}
        return participant_emails





class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['text','is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['text','choices']

class QuestionBlankSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBlank
        fields = ['text','answer']
        
class CourseQuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    questionblanks = QuestionBlankSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'questions', 'questionblanks']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        questionblanks_data = validated_data.pop('questionblanks', [])

        quiz = Quiz.objects.create(**validated_data)

        for question_data in questions_data:
            choices_data = question_data.pop('choices', [])
            question = Question.objects.create(quiz=quiz, **question_data)

            for choice_data in choices_data:
                Choice.objects.create(question=question, **choice_data)

        for questionblank_data in questionblanks_data:
            QuestionBlank.objects.create(quiz=quiz, **questionblank_data)

        return quiz

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        # Update or create questions
        questions_data = validated_data.get('questions', [])
        for question_data in questions_data:
            question_id = question_data.get('id')
            choices_data = question_data.pop('choices', [])

            if question_id:
                question = Question.objects.get(id=question_id, quiz=instance)
                question.text = question_data.get('text', question.text)
                question.save()
            else:
                question = Question.objects.create(quiz=instance, **question_data)

            # Update or create choices
            for choice_data in choices_data:
                choice_id = choice_data.get('id')
                if choice_id:
                    choice = Choice.objects.get(id=choice_id, question=question)
                    choice.text = choice_data.get('text', choice.text)
                    choice.is_correct = choice_data.get('is_correct', choice.is_correct)
                    choice.save()
                else:
                    Choice.objects.create(question=question, **choice_data)

        # Update or create questionblanks
        questionblanks_data = validated_data.get('questionblanks', [])
        for questionblank_data in questionblanks_data:
            questionblank_id = questionblank_data.get('id')
            if questionblank_id:
                questionblank = QuestionBlank.objects.get(id=questionblank_id, quiz=instance)
                questionblank.text = questionblank_data.get('text', questionblank.text)
                questionblank.answer = questionblank_data.get('answer', questionblank.answer)
                questionblank.save()
            else:
                QuestionBlank.objects.create(quiz=instance, **questionblank_data)

        return instance


class CourseLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['level']

class CourseSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSection
        fields = ['title', 'description']

class CourseDetailSerializer(serializers.ModelSerializer):
    sections = CourseSectionSerializer(many=True, read_only=True)
    quizzes = CourseQuizSerializer()
    class Meta:
        model = Course
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class UserLevelSerializer(serializers.ModelSerializer):
    course = CourseLevelSerializer()
    class Meta:
        model = UserLevel
        fields = '__all__'

