from DeanerySystem.lesson import Lesson
from DeanerySystem.term import Term 
from DeanerySystem.day import Day 

def test_1():   
    lesson = Lesson(Term(9, 35, Day.TUE), "Programowanie skryptowe", "Stanisław Polak", 2)
    lesson.earlierDay() # <- Przenosimy na Poniedzialek 9:30 - Dozwolone
    lesson.earlierDay() # <- Przenosimy na niedziele 9:30 - NIE dozwolone (zostanie MON)
    lesson.earlierTime() # <- Przenosimy na Poniedzialek 8:00 - Dozwolone
    lesson.earlierTime() # <- Prznosimy na Poniedzialek 6:30 - NIE dozwolone (zostanie 8:00)
    oczekiwane = Lesson(Term(8, 5, Day.MON), "Programowanie skryptowe", "Stanisław Polak", 2)
    assert lesson == oczekiwane

# Test dla studiow niestacjonarnych
def test_2():
    lesson = Lesson(Term(17, 0, Day.FRI), "Programowanie skryptowe", "Stanisław Polak", 2, False)
    lesson.earlierDay() # <- Przenosimy na czwartek - NIE Dozwolone (zostanie piatek)
    lesson.earlierTime() # <- Przenosimy na piatek 15:30 - NIE dozwolone (zostanie 17:00)
    lesson.laterTime() # <- Prznosimy na piatek 18:30 - Dozwolone
    lesson.laterTime() # <- Przenosimy na piatek 20:00 - NIE dozwolone (zostanie 18:30)
    lesson.laterDay() # <- Przenosimy na sobota 18:30 - Dozwolone
    lesson.laterDay() # <- Przenosimy na niedziela 18:30 - Dozwolone
    lesson.laterTime() # <- Przenosimy na niedziela 20:00 - NIE dozwolone (zostanie 18:30)
    lesson.laterDay() # <- Przenosimy na poniedzialek - NIE dozwolone (zostanie niedziela)
    lesson.earlierTime() # <- Przenosimy na niedziela 17:00 - dozwolone
    lesson.earlierTime() # <- Przenosimy na niedziela 15:30 - dozwolone
    lesson.earlierDay() # <- Przenosimy na sobota 15:30 - dozwolone
    lesson.earlierDay() # <- Przenosimy na piatek 15:30 - NIE dozwolone (zostanie sobota)
    oczekiwane = Lesson(Term(15, 30, Day.SAT), "Programowanie skryptowe", "Stanisław Polak", 2, False)


def test_3():
    lesson = Lesson(Term(17, 0, Day.FRI), "Programowanie skryptowe", "Stanisław Polak", 2)
    lesson.laterDay() # <- Przenosimy na sobote - NIE dozwolone (zostanie piatek)
    lesson.laterTime() # <- Przenosimy na Piatek 18:30 - dozwolone
    lesson.laterTime() # <- Przenosimy na Piatek 20:00 - NIE dozwolone (zostanie 18:30)
    lesson.earlierDay() # <- Przenosimy na czwartek - dozwolone
    oczekiwane = Lesson(Term(18, 30, Day.THU), "Programowanie skryptowe", "Stanisław Polak", 2)
