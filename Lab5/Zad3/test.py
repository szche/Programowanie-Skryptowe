from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term, to_hours_minutes 
from DeanerySystem.day import Day 
from DeanerySystem.timetable import Timetable1
from DeanerySystem.action import Action 
from DeanerySystem.timetable2 import Timetable2 
from DeanerySystem.breakterm import Break
from DeanerySystem.basictimetable import BasicTimetable 
from DeanerySystem.basicterm import BasicTerm 
import unittest

przerwa = Break(9, 30, 5)
przerwa2 = Break(11, 5, 10)
przerwa3 = Break(12, 45, 5)
przerwa4 = Break(14, 20, 20)
przerwa5 = Break(16, 10, 5)
przerwa6 = Break(17, 45, 5)
przerwa7 = Break(19, 20, 10)



class MyTestCase(unittest.TestCase):
    # Parser zwraca blad
    def test_parse(self):
        plan = Timetable2([przerwa, przerwa2, przerwa3])
        lista_polecen = ["X", "d-", "t+"]
        with self.assertRaises(ValueError) as context:
            plan.parse(lista_polecen)

    # Put zwraca blad
    def test_put(self):
        plan = Timetable2([przerwa, przerwa2, przerwa3])
        lesson = Lesson(Term(21, 30, Day.MON), "X", "X", 3)

        with self.assertRaises(ValueError) as context:
            plan.put(lesson)

    def test_busy(self):
        plan = Timetable2([przerwa, przerwa2, przerwa3])
        term = Term(7, 30, Day.MON, 5)
        with self.assertRaises(ValueError) as context:
            plan.busy(term)
                
    def test_put2(self):
        plan = Timetable2([przerwa, przerwa2, przerwa3])
        lesson1 = Lesson( Term(8,0, Day.MON), "A", "B", 3 ) 
        lesson2 = Lesson( Term(8,0, Day.MON), "C", "D", 3 ) 
        plan.put(lesson1)
        with self.assertRaises(ValueError) as context:
            plan.put(lesson2)

if __name__ == '__main__':
    unittest.main()
