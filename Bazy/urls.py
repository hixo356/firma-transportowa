from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('register', views.register, name = 'register'),
    path('login', views.login, name ='login'),
    path('kierowcy', views.kierowcy, name ='kierowcy'),
    path('trasy', views.trasy, name ='trasy'),
    path('pojazd', views.pojazd, name ='pojazd')
]