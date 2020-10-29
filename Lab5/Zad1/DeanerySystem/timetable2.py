from .timetable import Timetable1
from typing import List
from .breakterm import Break
from .term import Term, to_hours_minutes
from .day import Day
from .lesson import Lesson
from copy import deepcopy


class Timetable2(Timetable1):
    def __init__(self, breaks: List[Break]):
        self.table = []
        self.hours = []
        day_table = {}
        for breakTerm in breaks:
            breakTerm_start = breakTerm.term.count_time
            breakTerm_end = breakTerm.term.count_time + breakTerm.term.duration
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
            return True
        # Jesli podano zly czas
        table_values = []
        for times in self.hours:
            table_values.append(times[0])
        if term_time not in table_values:
            return True
        # Empty string means busy
        if type(self.table[term_day][1][term_time]) == type(""):
            return False
        return True 

