from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('kierowcy', views.kierowcy, name='kierowcy'),
    path('trasy', views.trasy, name='trasy'),
    path('pojazd', views.pojazd, name='pojazd'),
    path('destynacja', views.destynacja, name='destynacja'),
    path('poczatek', views.poczatek, name='poczatek'),
    path('ladunek', views.ladunek, name='ladunek'),
    path('zleceniodawca', views.zleceniodawca, name='zleceniodawca'),
    path('dodaj_poczatek', views.dodaj_poczatek, name='dodaj_poczatek'),
    path('dodaj_destynacje', views.dodaj_destynacje, name='dodaj_destynacje'),
    path('dodaj_trase', views.dodaj_trase, name='dodaj_trase'),
    path('usun_trase', views.usun_trase, name='usun_trase'),
    path('trasy_all', views.trasy_all, name='trasy_all'),
    path('get_trasa', views.get_trasa, name='get_trasa'),
    path('edytuj_trase', views.edytuj_trase, name='edytuj_trase')
]