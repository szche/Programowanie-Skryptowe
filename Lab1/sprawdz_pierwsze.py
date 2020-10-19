import sys

def isPrime(liczba):
    if liczba < 2: return False
    for i in range(2, (liczba//2)+1):
        if liczba%i == 0:
            return False
    return True 


for argument in sys.argv[1::]:
    if isPrime(int(argument)) == True:
        print("liczba pierwsza: {}".format(argument))

for i in range(100):
    if isPrime(i):
        print(i)
