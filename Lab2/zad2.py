#-*- coding: utf-8 -*-
import re 

def find(str):
    znalezione = {
        "liczba": None,
        "wyraz": None,
    }
    znajdz_liczbe = re.search("[0-9]+", str)
    if znajdz_liczbe is not None:
        znalezione["liczba"] = int(znajdz_liczbe[0])
        
    znajdz_wyraz = re.search("[A-Za-z\x80-\xFF]+", str)
    if znajdz_wyraz is not None:
        znalezione["wyraz"] = znajdz_wyraz[0]
    return znalezione

def wypisz(znalezione):
    for key in znalezione:
        if znalezione[key] is None: continue
        print("\t{}: {}".format(key, znalezione[key]))


if __name__ == "__main__":
    while True:  
        napis = input("Podaj tekst: ")
        wypisz(find(napis))
