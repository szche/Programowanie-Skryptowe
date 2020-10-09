import zad2
import unittest


class Test_TestZad2(unittest.TestCase):
    # Dla tekstu "Ala"
    def test_1(self):
        oczekiwane = {
            "liczba": None,
            "wyraz": "Ala",
        }
        self.assertEqual( zad2.find("Ala"), oczekiwane )

    # Dla tekstu "ma"
    def test_2(self):
        oczekiwane = {
            "liczba": None,
            "wyraz": "ma",
        }
        self.assertEqual( zad2.find("ma"), oczekiwane )

    # Dla tekstu "1kota"
    def test_3(self):
        oczekiwane = {
            "liczba": 1,
            "wyraz": "kota",
        }
        self.assertEqual( zad2.find("1kota"), oczekiwane )

    # Dla tekstu "oraz"
    def test_4(self):
        oczekiwane = {
            "liczba": None,
            "wyraz": "oraz",
        }
        self.assertEqual( zad2.find("oraz"), oczekiwane )

    # Dla tekstu "psów20"
    def test_5(self):
        oczekiwane = {
            "liczba": 20,
            "wyraz": "psów",
        }
        self.assertEqual( zad2.find("psów20"), oczekiwane )

    # Dla tekstu "ponadto"
    def test_6(self):
        oczekiwane = {
            "liczba": None,
            "wyraz": "ponadto",
        }
        self.assertEqual( zad2.find("ponadto"), oczekiwane )

    # Dla tekstu "50"
    def test_7(self):
        oczekiwane = {
            "liczba": 50,
            "wyraz": None,
        }
        self.assertEqual( zad2.find("50"), oczekiwane )

    # Dla tekstu "chomików"
    def test_8(self):
        oczekiwane = {
            "liczba": None,
            "wyraz": "chomików",
        }
        self.assertEqual( zad2.find("chomików"), oczekiwane )



if __name__ == '__main__':
    unittest.main()
