from typing import List
from .term import Term, to_hours_minutes
from .lesson import Lesson
from .action import Action
from .day import Day
from copy import deepcopy
from .breakterm import Break
from .basictimetable import BasicTimetable


class Timetable1(BasicTimetable):
    """ Class containing a set of operations to manage the timetable """
    def __init__(self):
        self.table = []
        self.hours = []
        for dzien in range(7):
            dzienny_podzial = {}
            for time in range(480, 1200, 90):
                dzienny_podzial[time] = "" 
            self.table.append( [Day(dzien), dzienny_podzial] )
        for time in range(480, 1200, 90):
            self.hours.append( [time, time+90] )


##########################################################
    def can_be_transferred_to(self, lesson: Lesson, term: Term) -> bool:
        if self.busy(term) == True:
            print("This term is busy!")
            return False
        
        allowed_hours = lesson.allowed_terms[term.day]
        if term.count_time < allowed_hours[0] or \
                term.count_time+90 > allowed_hours[1]:
            print("Not allowed hours!")
            return False
        return (True, term)


##########################################################

    def busy(self, term: Term) -> bool:
        term_time = term.count_time
        term_day = term.day.value
        # Jesli czas zbyt pozno / wczesnie
        if term_time < 480 or term_time > 1110:
            return True
        # Jesli podano zly czas
        table_values = self.table[term_day][1].keys()
        if term_time not in table_values:
            return True
        # Empty string means busy
        if type(self.table[term_day][1][term_time]) == type(""):
            return False
        return True 


##########################################################

    def perform(self, actions: List[Action]):
        lesson_queue = self.create_lesson_queue()
        counter = 0
        for action in actions:
            current_lesson = deepcopy(lesson_queue[counter])
            changed_lesson = deepcopy(lesson_queue[counter])
            print("-" * 20)
            print("Wykonuje akcje {} dla {}".format(action, current_lesson.name))
            if action == Action.DAY_EARLIER:
                changed_lesson.earlierDay()
            elif action == Action.DAY_LATER:
                changed_lesson.laterDay()
            elif action == Action.TIME_EARLIER:
                changed_lesson.earlierTime()
            elif action == Action.TIME_LATER:
                changed_lesson.laterTime()

            if self.busy(changed_lesson.term) == True:
                print("Cant be transferred!")
                counter += 1
                lesson_queue.append(current_lesson)
                continue
            self.table[current_lesson.term.day.value][1][current_lesson.term.count_time] = ""
            self.table[changed_lesson.term.day.value][1][changed_lesson.term.count_time] = changed_lesson
            counter += 1
            lesson_queue.append( changed_lesson )

##########################################################


