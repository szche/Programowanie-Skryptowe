from fractions import Fraction

def sum(arg1, arg2):
    #Dla liczb zespolonych
    if type(arg1) is complex or type(arg2) is complex:
        return complex( arg1.real + arg2.real, arg1.imag + arg2.imag )
    
    #Dla ulamkow
    elif type(arg1) is Fraction or type(arg2) is Fraction:
        return arg1 + arg2

    #Cala reszta
    assert(float(arg1))
    assert(float(arg2))
    liczba1 = float(arg1)
    liczba2 = float(arg2)
    return liczba1 + liczba2


if __name__ == '__main__':
    print("suma = {}".format( sum(2,3) ))
    print("__name__ = {}".format(__name__))

