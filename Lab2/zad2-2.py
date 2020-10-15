#-*- coding: utf-8 -*-
import zad2

# Zbierz input w liste tekst
tekst = []
linijka = input()
while linijka != "":
    tekst.append(linijka)
    linijka = input()

# Wykonaj operacje dla kazdego wyrazu
for linijka in tekst:
    zad2.find_new(linijka)

