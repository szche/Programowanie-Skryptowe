class Operacje:
    argumentySuma=[4,5]
    argumentyRoznica=[4,5,6]
    
    def __setitem__(self, key, item):
        if key == "suma":
            Operacje.argumentySuma = item
        elif key == "roznica":
            Operacje.argumentySuma = item

    def argumenty(func): 

        def inner(*args, **kwargs): 
            liczby = list(args[1::])
            if func.__name__ == "suma":
                elementy = liczby + Operacje.argumentySuma
                wynik = func( elementy[0], elementy[1], elementy[2] )
                if len(elementy) >= 4 and wynik == None: return elementy[3]
                return wynik

            elif func.__name__ == "roznica":
                elementy = liczby + Operacje.argumentyRoznica
                wynik = func( elementy[0], elementy[1] )
                if len(elementy) >= 3 and wynik == None: return elementy[2]
                return wynik

        return inner 


    @argumenty
    def suma(a,b,c):
        print("{}+{}+{}={}".format(a, b, c, a+b+c))

    @argumenty
    def roznica(x,y):
        print("{}-{}={}".format(x,y,x-y))

op=Operacje()
op.suma(1,2,3) #Wypisze: 1+2+3=6
op.suma(1,2) #Wypisze: 1+2+4=7 - 4 jest pobierana z tablicy 'argumentySuma'
op.suma(1) #Wypisze: 1+4+5=10 - 4 i 5 są pobierane z tablicy 'argumentySuma'
try:
    op.suma() #TypeError: suma() takes exactly 3 arguments (2 given)
except:
    print("Zbyt malo argumentow!")
op.roznica(2,1) #Wypisze: 2-1=1
op.roznica(2) #Wypisze: 2-4=-2
wynik=op.roznica() #Wypisze: 4-5=-1
print( wynik ) #Wypisze: 6

#Zmiana zawartości listy argumentów dekoratora  dla metody 'suma'
op['suma']=[1,2]
#oznacza, że   argumentySuma=[1,2]

#Zmiana zawartości listy argumentów dekoratora  dla metody 'roznica'
op['roznica']=[1,2,3]
#oznacza, że   argumentyRoznica=[1,2,3]
