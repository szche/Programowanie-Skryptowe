#-*- coding: utf-8 -*-
import re 

def find(str):
    znalezione = {
        "liczba": None,
        "wyraz": None,
    }
    znajdz_liczbe = re.search("\d+", str)
    if znajdz_liczbe is not None:
        znalezione["liczba"] = int(znajdz_liczbe[0])
        
    znajdz_wyraz = re.search("[A-Za-z\x80-\xFF]+", str)
    if znajdz_wyraz is not None:
        znalezione["wyraz"] = znajdz_wyraz[0]
    return znalezione


def find_new_length(obj):
    char = obj[0][0]
    add = char
    if char == "(":
        add = "%28"
    elif char == ")":
        add = "%29"
    elif char == "%":
        add = "%25"
    return "{}({})".format(add, str(obj.span()[1] - obj.span()[0]))
    
def find_new(str):
    #Znak )
    pattern_repeat = re.compile(r'([\)])\1*')
    str = pattern_repeat.sub(find_new_length, str)

    # Znak (
    pattern_repeat = re.compile(r'([\(])\1{4,}')
    str = pattern_repeat.sub(find_new_length, str)

    # Znak %
    pattern_repeat = re.compile(r'([\%])(?![0-9])\1*')
    str = pattern_repeat.sub(find_new_length, str)

    #Znak spacja
    pattern_repeat = re.compile(r'([\ ])\1{4,}')
    str = pattern_repeat.sub(find_new_length, str)

    #Pozostale
    pattern_repeat = re.compile(r'(\w)\1{4,}')
    str = pattern_repeat.sub(find_new_length, str)

    print(str)



def wypisz(znalezione):
    for key in znalezione:
        if znalezione[key] is None: continue
        print("\t{}: {}".format(key, znalezione[key]))


if __name__ == "__main__":
    while True:  
        napis = input("Podaj tekst: ")
        wypisz(find(napis))
