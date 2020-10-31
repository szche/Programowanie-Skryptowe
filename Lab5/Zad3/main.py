from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term, to_hours_minutes 
from DeanerySystem.day import Day 
from DeanerySystem.timetable2 import Timetable2
from DeanerySystem.action import Action 
from DeanerySystem.breakterm import Break 
import sys

# Zaimportuj lekcje z pliku plan.txt
lekcje = []
with open("plan.txt", "r") as file1:
    for line in file1:
        lekcja = line.strip().replace("\t", "").split(",")
        lesson = Lesson(Term(int(lekcja[0]), int(lekcja[1]), Day(int(lekcja[2]))),
                        lekcja[3], lekcja[4], 2)
        lekcje.append(lesson)

#Przerwy jak na normalnym podziale zajec
przerwa = Break(9, 30,  5)
przerwa2 = Break(11, 5,  10)
przerwa3 = Break(12, 45, 5)
przerwa4 = Break(14, 20, 20)
przerwa5 = Break(16, 10, 5)
przerwa6 = Break(17, 45, 5)
przerwa7 = Break(19, 20, 10)
plan = Timetable2([przerwa, przerwa2, przerwa3, przerwa4, przerwa5, przerwa6, przerwa7])

print("Plan lekcji:")
#Zapelnij plan lekcjami z pliku
for lekcja in lekcje:
    try:
        plan.put(lekcja)
    except ValueError as err:
        print("Napotkano blad ValueError: {}".format(err))
print(plan)

#Add the same lesson twice
print("=" * 20)
try:
    plan.put(lekcje[0])
except ValueError as err:
    print("Napotkano blad ValueError: {}".format(err))
print("=" * 20)

# Ciag przesuniec
lista_polecen = ["d+", "d+", "t+", "t-", "d+", "t+", "t-", "d+", "d-"]
lista_parsed = plan.parse(lista_polecen)
try:
    plan.perform(lista_parsed)
except ValueError as err:
    print("Napotkano blad ValueError: {}".format(err))
print("\nPlan lekcji po zmianach:")
print(plan)


