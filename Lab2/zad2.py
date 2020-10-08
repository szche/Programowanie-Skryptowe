#-*- coding: utf-8 -*-
import re 

def find(str):
    znajdz_liczbe = re.search("[0-9]+", str)
    if znajdz_liczbe is not None:
        print("\tLiczba: ", znajdz_liczbe[0])
        
    znajdz_wyraz = re.search("[A-Za-z\x80-\xFF]+", str)
    if znajdz_wyraz is not None:
        print("\tWyraz: ", znajdz_wyraz[0])


while True:  
    napis = input("Podaj tekst: ")
    find(napis)
