from typing import List
from .breakterm import Break
from .term import Term, to_hours_minutes
from .day import Day
from .lesson import Lesson
from copy import deepcopy
from .action import Action
from .basictimetable import BasicTimetable


class Timetable2(BasicTimetable):
    def __init__(self, breaks: List[Break]):
        self.table = []
        self.hours = []
        day_table = {}
        for breakTerm in breaks:
            breakTerm_start = breakTerm.count_time
            breakTerm_end = breakTerm.count_time + breakTerm.duration
            day_table[breakTerm_start] = breakTerm
            self.hours.append((breakTerm_start, breakTerm_end))
            
        time = 480
        while time <= 1200:
            lesson_range = range(time, time+90)
            for term_taken in self.hours:
                term_taken_beg = term_taken[0]
                term_taken_end = term_taken[-1] + 1
                duration = term_taken_end - term_taken_beg
                while term_taken_beg in lesson_range:
                    lesson_range = range( lesson_range[0]-1+duration, \
                            lesson_range[-1]+duration)
            day_table[lesson_range[0]] = ""
            time = lesson_range[0]
            time += 90
            self.hours.append((lesson_range[0], lesson_range[-1] + 1))
        for i in range(7):
            self.table.append( [Day(i), deepcopy(day_table)] )

    def busy(self, term: Term) -> bool:
        term_time = term.count_time
        term_day = term.day.value
        # Jesli czas zbyt pozno / wczesnie
        if term_time < 480 or term_time > 1110:
            raise ValueError("Zajecia sa zbyt wczenis elub zbyt pozno!")
        # Jesli podano zly czas
        table_values = []
        for times in self.hours:
            table_values.append(times[0])
        if term_time not in table_values:
            raise ValueError("Podano nieprawidlowa godzine rozpoczecia zajec!")
        # Empty string means busy
        if type(self.table[term_day][1][term_time]) == type(""):
            return False
        if type(self.table[term_day][1][term_time]) == Lesson:
            raise ValueError("Ten termin jest juz zajety!")
        if type(self.table[term_day][1][term_time]) == Break:
            raise ValueError("Ten termin jest juz zajety!")
        return False 

    def can_be_transferred_to(self, lesson: Lesson, term: Term):
        # Jesli nie mozesz przenikac przez przerwy i termin jest zajety
        if lesson.skipBreaks == False and self.busy(term) == True:
            print("This term is busy!")
            return (False, term)

        # Jesli nie mozesz przenikac przez przerwy i termin jest wolny
        if lesson.skipBreaks == False and self.busy(term) == False:
            # Sprawdz czy term jest w dozwolonych godzinach
            allowed_hours = lesson.allowed_terms[term.day]
            if term.count_time < allowed_hours[0] or \
                    term.count_time+90 > allowed_hours[1]:
                print("Not allowed hours!")
                return (False, term)
                

        # Jesli mozesz przenikac przez przerwy i termin jest wolny
        if lesson.skipBreaks == True and self.busy(term) == False:
            # Sprawdz czy term jest w dozwolonych godzinach
            allowed_hours = lesson.allowed_terms[term.day]
            if term.count_time < allowed_hours[0] or \
                    term.count_time+90 > allowed_hours[1]:
                print("Not allowed hours!")
                return (False, term)

        # Jesli mozesz przneikac przez przerwy i termin jest zajety
        if lesson.skipBreaks == True and self.busy(term) == True:
            # Sprawdz czy zajete przez przerwe
            day = self.table[term.day.value]
            if type(day[1][term.count_time]) == Break:
                delayed_term = term.count_time + day[1][term.count_time].duration
                new_term = to_hours_minutes(delayed_term)
                term = Term(new_term["hour"], new_term["minute"], term.day)
            else:
                return (False, term)
        return (True, term)

    def perform(self, actions: List[Action]):
        lesson_queue = self.create_lesson_queue()
        counter = 0
        for action in actions:
            current_lesson = deepcopy(lesson_queue[counter])
            changed_lesson = deepcopy(lesson_queue[counter])
            if action == Action.DAY_EARLIER:
                changed_lesson.earlierDay()
            elif action == Action.DAY_LATER:
                changed_lesson.laterDay()
            elif action == Action.TIME_EARLIER:
                changed_lesson.earlierTime()
            elif action == Action.TIME_LATER:
                changed_lesson.laterTime()
            transfer_result = self.can_be_transferred_to(current_lesson, changed_lesson.term)
            if transfer_result[0] == False:
                counter += 1
                lesson_queue.append(current_lesson)
                continue
            transfer_new_term = transfer_result[1]
            changed_lesson.term = transfer_new_term
            self.table[current_lesson.term.day.value][1][current_lesson.term.count_time] = ""
            self.table[changed_lesson.term.day.value][1][changed_lesson.term.count_time] = changed_lesson
            counter += 1
            lesson_queue.append( changed_lesson )

    


