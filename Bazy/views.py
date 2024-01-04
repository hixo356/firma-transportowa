from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib import auth
from django.http import HttpResponse

# Create your views here.
def index(request):

    feature1 = Feature()
    feature1.id = 0
    feature1.name = 'Trasy'
    feature1.details = ' '
    feature1.url = 'trasy'

    feature2 = Feature()
    feature2.id = 1
    feature2.name = 'Kierowcy'
    feature2.details = ' '
    feature2.url = 'kierowcy'

    feature3 = Feature()
    feature3.id = 2
    feature3.name = 'Pojazdy'
    feature3.details = ' '
    feature3.url = 'pojazd'



    features = [feature1, feature2, feature3]

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
                user = User.objects.create_user(username=username, email=email, password = password)
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

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'invalid')
            return redirect('login')

    return render(request, 'login.html')


def kierowcy(request):
    if request.method == 'POST':
        imie = request.POST['imie']
        nazwisko = request.POST['nazwisko']
        pesel = request.POST['pesel']
        telefon = request.POST['telefon']

        kierowca = Kierowca.objects.create(imie=imie, nazwisko=nazwisko, pesel=pesel, telefon=telefon)
        kierowca.save();

    return render(request, 'kierowcy.html')


def trasy(request):

    ladunki = Ladunek.objects.all()

    if request.method == "POST" and "fladunek" in request.POST:
    #DODANIE LADUNKU
    if request.method == "POST" and "ftrasa" in request.POST:
    #DODANIE TRASY

    return render(request, 'trasy.html', {'ladunki': ladunki})


def pojazd(request):
    if request.method == "POST":
        marka = request.POST['marka']
        ubezpieczenie = request.POST['ubezpieczenie']
        przeglad = request.POST['przeglad']
        id_kierowca = request.POST['id_kierowca']
        nr_rejestracyjny = request.POST['nr_rejestracyjny']

        kierowca = Kierowca.objects.get(pk=id_kierowca)
        p = Pojazd(marka=marka, ubezpieczenie=ubezpieczenie, przeglad=przeglad, id_kierowca=kierowca, nr_rejestracyjny=nr_rejestracyjny)
        p.save()


    return render(request, 'pojazd.html')


def destynacja(request):
    if request.method == "POST":
        adres = request.POST['adres']
        wspolrzedne = request.POST['wspolrzedne']
        telefon = request.POST['telefon']

        d = Destynacja.objects.create(adres=adres, wspolrzedne =wspolrzedne , telefon=telefon)
        d.save();

    return render(request, 'destynacja.html')


def ladunek(request):
    if request.method == "POST":
        masa = request.POST['masa']
        pojazd = request.POST['pojazd']
        stan = request.POST['stan']
        l = Ladunek.objects.create(masa=masa, pojazd=pojazd, stan=stan)
        l.save()
        return HttpResponse('<body onload="window.close();">')

    return render(request, 'ladunek.html')

def poczatek(request):
    if request.method == "POST":
        adres = request.POST['adres']
        wspolrzedne = request.POST['wspolrzedne']
        telefon = request.POST['telefon']

        p = Poczatek.objects.create(adres=adres, wspolrzedne=wspolrzedne,
                                      telefon=telefon)
        p.save();
    return render(request, 'poczatek.html')

def zleceniodawca(request):
    if request.method == "POST":
        telefon = request.POST['id_zleceniodawca']
        nip = request.POST['nip']
        regon = request.POST['regon']

        z = Zleceniodawca.objects.create(nip=nip, regon=regon,
                                    telefon=telefon)
        z.save();
    return render(request, 'zleceniodawca.html')