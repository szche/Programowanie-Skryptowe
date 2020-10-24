from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term, to_hours_minutes 
from DeanerySystem.day import Day 
from DeanerySystem.timetable import Timetable1
from DeanerySystem.action import Action 


action = Action.DAY_EARLIER
print(action)

lesson = Lesson(Term(9, 30, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
print(lesson) 


plan = Timetable1()
print(plan)
termin = Term(9, 30, Day.TUE)
plan.put(lesson)
print(plan)


lista = plan.parse( ["d-", "d-", "t-", "d+", "d+", "d+", "t-"] )

print(plan.get(Term(9, 30, Day.TUE)))

print("PERFORM")
plan.perform(lista)

print(plan)

