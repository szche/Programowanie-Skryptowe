from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term, to_hours_minutes 
from DeanerySystem.day import Day 
from DeanerySystem.timetable import Timetable1
from DeanerySystem.action import Action 
from DeanerySystem.timetable2 import Timetable2 
from DeanerySystem.breakterm import Break

przerwa = Break(9, 30, 5)
przerwa2 = Break(11, 5, 10)
przerwa3 = Break(12, 45, 5)
przerwa4 = Break(14, 20, 20)
przerwa5 = Break(16, 10, 5)
przerwa6 = Break(17, 45, 5)
przerwa7 = Break(19, 20, 10)

#Sprawdz czy przerwy dobrze sie tworza
def Break_create():
    przerwa = Break(9, 30, 5)
    przerwa2 = Break(11, 5, 10)
    przerwa3 = Break(12, 45, 5)
    przerwa4 = Break(14, 20, 20)
    przerwa5 = Break(16, 10, 5)
    przerwa6 = Break(17, 45, 5)
    przerwa7 = Break(19, 20, 10)
    

# Test parsera komend
def test_parser():
    plan = Timetable2([przerwa, przerwa2, przerwa3, przerwa4, przerwa5, przerwa6, przerwa7])
    lista_polecen = ["d-", "d-", "t+", "t-", "d+", "t+", "t-"]
    lista_parsed = plan.parse(lista_polecen)
    lista_akcji = [Action.DAY_EARLIER, Action.DAY_EARLIER, Action.TIME_LATER, \
            Action.TIME_EARLIER, Action.DAY_LATER, Action.TIME_LATER, Action.TIME_EARLIER]
    assert lista_parsed == lista_akcji

def test_busy_put():
    plan = Timetable2([przerwa, przerwa2, przerwa3, przerwa4, przerwa5, przerwa6, przerwa7])
    lesson = Lesson(Term(8, 0, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
    # Wstawiamy powyzsza lekcje do planu, powinno sie udac
    assert plan.put(lesson) == True
    lesson2 = Lesson(Term(8, 0, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
    # Teraz wstawiamy ta sama lekcje drugi raz, nie powinno sie udac
    assert plan.put(lesson2) == False
    # Teraz wstawiamy ta sama lekcje w miejsce przerwy bez skipBreaks, powinno sie nie udac
    lesson2 = Lesson(Term(9, 30, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2, skipBreaks=False)
    assert plan.put(lesson2) == False

    # Sprawdzamy czy dziala SkipBreaks 
    lesson2 = Lesson(Term(8, 0, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2, skipBreaks=True)
    # sprawdzmy czy mozna przeniesc lesson2 w miejsce lesson
    assert plan.can_be_transferred_to(lesson2, Term(9, 30, Day.TUE))[0] == True


def test_parse():
    plan = Timetable2([przerwa, przerwa2, przerwa3, przerwa4, przerwa5, przerwa6, przerwa7])
    # Zaimportuj lekcje z pliku plan.txt
    lekcje = []
    with open("plan.txt", "r") as file1:
        for line in file1:
            lekcja = line.strip().replace("\t", "").split(",")
            lesson = Lesson(Term(int(lekcja[0]), int(lekcja[1]), Day(int(lekcja[2]))),
                            lekcja[3], lekcja[4], 2)
            lekcje.append(lesson)
    
    #Zapelnij plan lekcjami z pliku
    for lekcja in lekcje:
        plan.put(lekcja)
    print(plan)

    # Ciag przesuniec
    lista_polecen = ["d+", "d+", "t+", "t-", "d+", "t+", "t-", "d+", "d-"]
    lista_parsed = plan.parse(lista_polecen)
    plan.perform(lista_parsed)

    assert plan.get(Term(8, 0, Day.MON)).name == "Kryptografia" 
    assert plan.get(Term(9, 35, Day.MON)).name == "Inf. Sledcza" 
    assert plan.get(Term(12, 50, Day.MON)).name == "Inf. Sledcza"
    assert plan.get(Term(8, 0, Day.TUE)).name == "Bezp. Sieci"
    assert plan.get(Term(9, 35, Day.TUE)).name == "Bezp. Apli"
    assert plan.get(Term(11, 15, Day.TUE)).name == "Kryptografia"
    assert plan.get(Term(12, 50, Day.TUE)).name == "Bezp. Apli"
    assert plan.get(Term(8, 0, Day.WED)).name == "Sysopy" 
    assert plan.get(Term(9, 35, Day.THU)).name == "Sysopy" 
    assert plan.get(Term(11, 15, Day.THU)).name == "Prog. Skrypt." 
    assert plan.get(Term(12, 50, Day.THU)).name == "Prog. Skrypt." 
    assert plan.get(Term(17, 50, Day.THU)).name == "Bezp. Sieci" 
    assert plan.get(Term(9, 35, Day.FRI)).name == "Fizyka"
    assert plan.get(Term(11, 15, Day.FRI)).name == "Fizyka"
