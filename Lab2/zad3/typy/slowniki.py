from . import slownik

def zapisz( cyfry ):
    for cyfra in cyfry:
        if cyfra not in slownik:
            slownik[cyfra] = 1
        else:
            slownik[cyfra] += 1
    wypisz()


def wypisz():
    print("Wypisywanie danych ze slownika")
    for key in sorted(slownik):
        print("{}:{}".format(key, slownik[key]), end=",  ")
    print("\n--------------")
