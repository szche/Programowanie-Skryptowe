import main
import unittest
import cmath
from fractions import Fraction 


class Test_TestIncrementDecrement(unittest.TestCase):
    def test_sum_integer_integer(self):
        self.assertEqual(main.sum(2, 2), 4)

    def test_sum_integer_float(self):
        self.assertEqual(main.sum(2, 1.5), 3.5)

    def test_sum_integer_string(self):
        self.assertEqual(main.sum(2, '2'), 4)

    def test_sum_string_string(self):
        self.assertEqual(main.sum('2.1', '2.0'), 4.1)

    def test_sum_integer_wrong_number_in_string(self):
        #self.assertEqual(main.sum(2, 'Ala ma kota123'), 2)
        with self.assertRaises(Exception) as cm:
            main.sum(2, "Ala ma kota123")
        

    def test_sum_fraction_correct(self):
        self.assertEqual( main.sum( Fraction(8, 25), Fraction(10, 18) ), Fraction(197, 225) )
        self.assertEqual( main.sum( Fraction(1, 3), Fraction(2, 3) ), Fraction(1,1) )

    def test_sum_complex_correct(self):
        self.assertEqual( main.sum( complex(1, 2), complex(2, 10) ), complex(3, 12) )


if __name__ == '__main__':
    unittest.main()
