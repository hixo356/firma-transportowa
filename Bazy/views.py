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


def dodaj_ladunek(request):
    masa = request.POST['masa']
    pojazd = request.POST['pojazd']
    stan = request.POST['stan']
    l = Ladunek.objects.create(masa=masa, pojazd=pojazd, stan=stan)
    l.save()
    return l.pk

def usun_ladunek(request):
    do_usuniecia = Ladunek.objects.get(pk=request.POST['usun_ladunek'])
    do_usuniecia.delete()
    return True

def trasy(request):
    print(request.POST)

    database = {'ladunki_obj': Ladunek.objects.all(),
                'zlec_obj': Zleceniodawca.objects.all(),
                'pocz_obj': Poczatek.objects.all(),
                'dest_obj': Destynacja.objects.all(),
                'kier_obj': Kierowca.objects.all()}

    # sel_objects = {'zleceniodawca': "",
    #                'ladunek': "",
    #                'poczatek': "",
    #                'destynacja': "",
    #                'kierowca': "",
    #                'przychod': ""}

    # ladunki_popup = request.POST['ladunki']
    popup = request.POST.get('popup', 0)
    # print(ladunki_popup)

    if request.method == 'POST':
        if "dodaj_ladunek" in request.POST:
            if request.POST['dodaj_ladunek'] == "dod":
                dodaj_ladunek(request)
                popup = 1
            elif request.POST['dodaj_ladunek'] == "wyb":
                sel_id = dodaj_ladunek(request)
                sel_ladunek = Ladunek.objects.get(pk=sel_id)
                return render(request, 'trasy.html', {'database': database, 'popup': 0, 'sel_ladunek': sel_ladunek})
        elif "usun_ladunek" in request.POST:
            if usun_ladunek(request):
                print("usunieto ladunek")
                popup = 1
        elif "wybierz_ladunek" in request.POST:
            sel_id = request.POST['wybierz_ladunek']
            sel_ladunek = Ladunek.objects.get(pk=sel_id)
            return render(request, 'trasy.html', {'database': database, 'popup': 0, 'sel_ladunek': sel_ladunek})

        match int(popup):
            case 0:
                print("POPUP OFF")
                return render(request, 'trasy.html', {'database': database, 'popup': 0})
            case 1:
                print("POPUP ON")
                return render(request, 'trasy.html', {'database': database, 'popup': 1})
            case _:
                return render(request, 'trasy.html', {'database': database, 'popup': 0})


    return render(request, 'trasy.html', {'popup': 0, 'database': database,
                                          'sel_ladunek': "",
                                          'sel_zlec': "",
                                          'sel_pocz': "",
                                          'sel_dest': "",
                                          'sel_kier': ""})

def ladunek_popup(request):
    if request.method == 'POST':
        dodaj_ladunek(request)

def ladunek(request):
    if request.method == 'POST':
        if "dodaj_ladunek" in request.POST:
            if dodaj_ladunek(request):
                return HttpResponse('<body onload="window.close();">')
        elif "usun_ladunek" in request.POST:
            do_usuniecia = Ladunek.objects.get(pk=request.POST['usun_ladunek'])
            do_usuniecia.delete()

    return render(request, 'ladunek.html')


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





    ladunki_obj = Ladunek.objects.all()

    return render(request, 'ladunek.html', {'ladunki': ladunki_obj})

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