from django.shortcuts import render
from .models import Feature
from django.contrib.auth.models import User
from django.contrib import messages

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

    return render(request, 'register.html')

def dodaj_trase(request):
    if request.method == 'POST':

    return render(request, 'dodaj_trase.html')
