from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term, to_hours_minutes 
from DeanerySystem.day import Day 
from DeanerySystem.timetable import Timetable1
from DeanerySystem.action import Action 


plan = Timetable1()
lesson = Lesson(Term(9, 30, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
lesson2 = Lesson(Term(8, 0, Day.MON), "Kryptografia", "Pawel Topa", 2)
lesson3 = Lesson(Term(17, 0, Day.THU), "Bezpieczenstwo Lokalnych sieci komputerowych", "Jacek Rzasa", 2)
lesson4 = Lesson(Term(18, 30, Day.SAT), "Zajecia niestacjonarne", "Dr. Oetker", 2, False)


plan.put(lesson)
plan.put(lesson2)
plan.put(lesson3)
plan.put(lesson4)
print(plan)


