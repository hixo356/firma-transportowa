from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('kierowcy', views.kierowcy, name='kierowcy'),
    path('trasy', views.trasy, name='trasy'),
    path('pojazd', views.pojazd, name='pojazd'),
    path('destynacja', views.destynacja, name='destynacja'),
    path('poczatek', views.poczatek, name='poczatek'),
    path('ladunek', views.ladunek, name='ladunek'),
    path('zleceniodawca', views.zleceniodawca, name='zleceniodawca')
]