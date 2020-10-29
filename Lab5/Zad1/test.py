from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term, to_hours_minutes 
from DeanerySystem.day import Day 
from DeanerySystem.timetable import Timetable1
from DeanerySystem.action import Action 

# Test parsera komend
def test_parser():
    plan = Timetable1()
    lista_polecen = ["d-", "d-", "t+", "t-", "d+", "t+", "t-"]
    lista_parsed = plan.parse(lista_polecen)
    lista_akcji = [Action.DAY_EARLIER, Action.DAY_EARLIER, Action.TIME_LATER, \
            Action.TIME_EARLIER, Action.DAY_LATER, Action.TIME_LATER, Action.TIME_EARLIER]
    assert lista_parsed == lista_akcji

def test_busy_put():
    plan = Timetable1()
    lesson = Lesson(Term(9, 30, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
    # Wstawiamy powyzsza lekcje do planu, powinno sie udac
    assert plan.put(lesson) == True
    lesson2 = Lesson(Term(9, 30, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
    # Teraz wstawiamy ta sama lekcje drugi raz, nie powinno sie udac
    assert plan.put(lesson2) == False
    # Teraz sprawdzmy czy mozna wstawic w inny termin, powinno sie udac
    lesson2 = Lesson(Term(18, 30, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
    assert plan.put(lesson2) == True
    # sprawdzmy czy mozna przeniesc lesson2 w miejsce lesson
    assert plan.can_be_transferred_to(lesson2, Term(9, 30, Day.TUE)) == False
    # A co jesli ten termin jest wolny, ale nie dozwolony?
    assert plan.can_be_transferred_to(lesson2, Term(21, 30, Day.TUE)) == False

def test_parse():
    plan = Timetable1()
    lesson1 = Lesson(Term(9, 30, Day.TUE), "Programowanie Skryptowe", "Stanisław Polak", 2)
    lesson2 = Lesson(Term(8, 0, Day.MON), "Kryptografia", "Stanisław Polak", 2)
    lesson3 = Lesson(Term(12, 30, Day.FRI), "Fizyka 2", "Stanisław Polak", 2)
    plan.put(lesson1)
    plan.put(lesson2)
    plan.put(lesson3)
    assert plan.create_lesson_queue() == [lesson2, lesson1, lesson3]
    polecenia = plan.perform(plan.parse( ["t-", "d-", "d+", "d+", "t+", "t+"] ))
    # "t-" dla Kryptografii - NIE dozwolone     -> Poniedzialek 8:00
    # "d-" dla Prog. Skryp. - dozwolone         -> Poniedzialek 9:30
    # "d+" dla Fizyki 2 - NIE dozwolone         -> Piatek 12:30
    # "d+" dla Kryptografii - dozwolone         -> Wtorek 8:00
    # "t+" dla Prog. Skryp. - dozwolone         -> Poniedzialek 11:00
    # "t+" dla Fizyki 2 - dozwolone             -> Piatek 14:00
    lesson1_changed = Lesson(Term(11, 0, Day.MON), "Programowanie Skryptowe", "Stanisław Polak", 2)
    lesson2_changed = Lesson(Term(8, 0, Day.TUE), "Kryptografia", "Stanisław Polak", 2)
    lesson3_changed = Lesson(Term(14, 0, Day.FRI), "Fizyka 2", "Stanisław Polak", 2)
    print(plan)
    assert plan.get( lesson1_changed.term ) == lesson1_changed
    assert plan.get( lesson2_changed.term ) == lesson2_changed
    assert plan.get( lesson3_changed.term ) == lesson3_changed
    

