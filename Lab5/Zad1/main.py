from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term, to_hours_minutes 
from DeanerySystem.day import Day 
from DeanerySystem.timetable2 import Timetable2
from DeanerySystem.action import Action 
from DeanerySystem.breakterm import Break 

# Zaimportuj lekcje z pliku plan.txt
lekcje = []
with open("plan.txt", "r") as file1:
    for line in file1:
        lekcja = line.strip().replace("\t", "").split(",")
        lesson = Lesson(Term(int(lekcja[0]), int(lekcja[1]), Day(int(lekcja[2]))),
                        lekcja[3], lekcja[4], 2)
        lekcje.append(lesson)

#Przerwy jak na normalnym podziale zajec
przerwa = Break(Term(9, 30, None, 5))
przerwa2 = Break(Term(11, 5, None, 10))
przerwa3 = Break(Term(12, 45, None, 5))
przerwa4 = Break(Term(14, 20, None, 20))
przerwa5 = Break(Term(16, 10, None, 5))
przerwa6 = Break(Term(17, 45, None, 5))
przerwa7 = Break(Term(19, 20, None, 10))
plan = Timetable2([przerwa, przerwa2, przerwa3, przerwa4, przerwa5, przerwa6, przerwa7])

print("Plan lekcji:")
#Zapelnij plan lekcjami z pliku
for lekcja in lekcje:
    plan.put(lekcja)
print(plan)


