import sys

# Jako argument przyjmuje nazwe pliku
# Zwraca ilosc liczb parzystych w tym pliku
def count_evens(filename):
    liczby = 0
    with open(filename, "r") as plik:
        for line in plik: liczby += len(list(filter(lambda x: int(x)%2 == 0, line.strip().split())))
    return liczby 

# One-liner do policzenia sumy dla wielu plikow
print( sum( [count_evens(name) for name in sys.argv[1::]] ) )




