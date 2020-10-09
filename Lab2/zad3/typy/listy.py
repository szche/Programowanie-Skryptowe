
lista = []

def zapisz(cyfry):
    global lista
    for cyfra in sorted( list(set(cyfry)) ):
        lista.append( cyfry.count(cyfra) )
    #print(lista)
    wypisz(cyfry)

def wypisz(cyfry):
    print("Wypisywanie danych z listy")
    cyfry = sorted(list(set(cyfry)))
    for x, wystapienia in enumerate(lista):
        if wystapienia == 0: continue
        print("{}:{}".format(cyfry[x], wystapienia), end=",  ")
    print("\n--------------")
