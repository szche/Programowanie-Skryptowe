import sys

def count_evens(filename):
    liczby = []
    with open(filename, "r") as plik:
        for line in plik:
            liczby += line.strip().split()
    return len( list( filter(lambda x: int(x) % 2 == 0, liczby) ) )

print( sum( [count_evens(name) for name in sys.argv[1::]] ) )




