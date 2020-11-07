import sys

# Jako argument przyjmuje nazwe pliku
# Zwraca ilosc liczb parzystych w tym pliku
def count_evens(filename):
    liczby = []
    with open(filename, "r") as plik:
        for line in plik:
            liczby += line.strip().split()
    return len([liczba for liczba in liczby if int(liczba) % 2 == 0 ])

# One-liner do policzenia sumy dla wielu plikow
print( sum( [count_evens(name) for name in sys.argv[1::]] ) )




