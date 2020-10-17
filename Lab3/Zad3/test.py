import unittest
from DeanerySystem.term import Term
from DeanerySystem.day import Day

class Test_TestIncrementDecrement(unittest.TestCase):
    def terminy(self):
        term1 = Term(Day.TUE, 9, 45)
        term2 = Term(Day.WED, 10, 15)
        self.assertEqual( term1.earlierThan(term2), True )
        self.assertEqual( term1.laterThan(term2), False)
        self.assertEqual( term1.equals(term2), False)



if __name__ == '__main__':
    unittest.main()
