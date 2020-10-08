import sys

def isPrime(liczba):
    prime = True
    for i in range(2, (liczba//2)+1):
        if liczba%i == 0:
            return False
    return prime


for argument in sys.argv[1::]:
    if isPrime(int(argument)) == True:
        print("liczba pierwsza: {}".format(argument))
