class Klasa(object):
    tab = []
    _zmienna1 = None
    __zmienna2 = None

    def __init__(self, tablica, _zmienna1, __zmienna2):
        print("Wywołano metodę '__init__()'")
        self.tab = tablica
        self._zmienna1 = _zmienna1
        self.__zmienna2 = __zmienna2
        print(self.tab, Klasa.tab)

    def __del__(self):
        print("Wywołano metodę '__del__()'")

    def __str__(self):
        return "Wywołano metodę '__str__()'"

    def metodaInstancyjna(self):
        print("Wywołano metodę 'metodaInstancyjna()'")
        print("\tWartosc instancyjna tab    ->", self.tab)
        print("\tWartosc klasowa tab    ->", tab)

    @classmethod
    def metodaKlasowa(cls):
        print("Wywołano metodę 'metodaKlasowa()'")

    @staticmethod
    def metodaStatyczna():
        print("Wywołano metodę 'metodaStatyczna()'")


if __name__ == "__main__":
    obiekt = Klasa([4, 5, 6], 10, 20)
    print(obiekt.tab)
    print(obiekt._zmienna1)
    print(obiekt._Klasa__zmienna2)
