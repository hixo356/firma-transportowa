from django.db import models

# Create your models here.
class Feature:
    id: int
    name: str
    details: str


class Destynacja(models.Model):
    id_destynacja = models.AutoField(primary_key=True)
    adres = models.TextField()
    wspolrzedne = models.CharField(max_length=19)
    telefon = models.CharField(max_length=12)
class Ladunek(models.Model):
    STANY_POJ = [
        ("N", "Nowy"),
        ("U", "Używany"),
    ]
    id_ladunek = models.AutoField(primary_key=True)
    masa = models.CharField(max_length=5)
    pojazd = models.CharField()
    stan = models.CharField(max_length=1, choices=STANY_POJ)

    def stan_read(self):
        return self.get_stan_display()
class Zleceniodawca(models.Model):
    id_zleceniodawca = models.AutoField(primary_key=True)
    nazwa = models.CharField(max_length=19)
    telefon = models.CharField(max_length=12)
    nip = models.CharField(max_length=10)
    regon = models.CharField(max_length=9)
class Poczatek(models.Model):
    id_poczatek = models.AutoField(primary_key=True)
    adres = models.TextField()
    wspolrzedne = models.CharField(max_length=19)
    telefon = models.CharField(max_length=12)
class Kierowca(models.Model):
    id_kierowca = models.AutoField(primary_key=True)
    imie = models.CharField()
    nazwisko = models.CharField()
    pesel = models.CharField(max_length=11)
    telefon = models.CharField(max_length=12)
    # id_pojazd = models.ForeignKey("Pojazd", on_delete=models.SET(''))
class Pojazd(models.Model):
    id_pojazd = models.AutoField(primary_key=True)
    marka = models.CharField()
    ubezpieczenie = models.CharField(max_length=10)
    przeglad = models.CharField(max_length=10)
    id_kierowca = models.ForeignKey(Kierowca, on_delete=models.SET(''))
    nr_rejestracyjny = models.CharField(max_length=8)
class Trasy(models.Model):
    id_trasa = models.AutoField(primary_key=True)
    id_zleceniodawca = models.ForeignKey(Zleceniodawca, on_delete=models.SET(''))
    id_ladunek = models.ForeignKey(Ladunek, on_delete=models.SET(''))
    id_poczatek = models.ForeignKey(Poczatek, on_delete=models.SET(''))
    id_destynacja = models.ForeignKey(Destynacja, on_delete=models.SET(''))
    id_kierowca = models.ForeignKey(Kierowca, on_delete=models.SET(''))
    przychod = models.IntegerField()
    data = models.CharField(max_length=10)

