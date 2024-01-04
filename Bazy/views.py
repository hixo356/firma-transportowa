from django.shortcuts import render, redirect
from .models import Feature
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib import auth

=========
>>>>>>>>> Temporary merge branch 2
# Create your views here.
def index(request):

    feature1 = Feature()
    feature1.id = 0
    feature1.name = 'jakas nazwa'
    feature1.details = ' szczegoly GDGSD GGD'

    feature2 = Feature()
    feature2.id = 1
    feature2.name = 'jakas nazwa'
    feature2.details = ' szczegoly GDGSD GGD'

    feature3 = Feature()
    feature3.id = 2
    feature3.name = 'jakas nazwa'
    feature3.details = ' szczegoly GDGSD GGD'

    feature4 = Feature()
    feature4.id = 3
    feature4.name = 'jakas nazwa'
    feature4.details = ' szczegoly GDGSD GGD'

    features = [feature1, feature2, feature3, feature4]

    return render(request, 'index.html', {'features': features})

def register(request):
    if request.method == 'POST':

        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        repeat_password = request.POST['repeat_password']

        if password == repeat_password:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Already used')
                return redirect('register')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'User already used')
                return redirect('register')
            else:
                user = User.objects.create_user(username=username, email= email, password = password)
                user.save();
                return redirect('login')
        else:
            messages.info(request, 'Password not the same')
            return redirect('register')
    else:
        return render(request, 'register.html')

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username = username, password = password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'invalid')
            return redirect('login')

    return render(request, 'login.html')


def kierowcy(request):

    return render(request, 'kierowcy.html')


def trasy(request):

    return render(request, 'trasy.html')


def pojazd(request):
    return render(request, 'pojazd.html')

def dodaj_trase(request):
    if request.method == 'POST':

    return render(request, 'dodaj_trase.html')
