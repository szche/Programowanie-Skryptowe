from typing import List
from .breakterm import Break
from .term import Term, to_hours_minutes
from .day import Day
from .lesson import Lesson
from copy import deepcopy
from .action import Action

class BasicTimetable:

    # Zbuduj plan lekcji
    def __str__(self):
        output = "\t\t*"
        for nazwa_dnia in self.table:
            output += f"{nazwa_dnia[0]: <13}*"
        output += "\n\t\t"
        output += "*" * ((13*7) + 8)
        output += "\n"
        for godzina in sorted(self.hours):
            t_start = to_hours_minutes(godzina[0])
            t_end = to_hours_minutes(godzina[1])
            output += f'  {t_start["hour"]}:{t_start["minute"]:02d}-{t_end["hour"]}:{t_end["minute"]:02d}\t*'
            for lekcja in self.table:
                lesson = lekcja[1][godzina[0]]
                if type(lesson) == Lesson:
                    nazwa_przedmiotu = lesson.name
                    if len(nazwa_przedmiotu) > 13:
                        nazwa_przedmiotu = nazwa_przedmiotu[:10] + "..."
                    output += f"{nazwa_przedmiotu: <13}*"
                elif type(lesson) == Break:
                    output += "     ---     *"
                else:
                    output += (" " * 13) + "*"
            output += "\n\t\t"
            output += "*" * ((13*7) + 8)
            output += "\n"
        return output

    def put(self, lesson: Lesson) -> bool:
        # Return false if the slot is already occpuied
        if self.busy(lesson.term) == True:
            return False
        lesson_time = lesson.term.count_time 
        lesson_day = lesson.term.day.value
        self.table[lesson_day][1][lesson_time] = lesson
        return True

    def create_lesson_queue(self):
        # Stworz kolejke lekcji
        lesson_queue = []
        for day in self.table:
            for lesson in day[1].values():
                if type(lesson) == Lesson:
                    lesson_queue.append(lesson)
        return lesson_queue

    def parse(self, actions: List[str]) -> List[Action]:
        lista = []
        for action in actions:
            if action == "d-":
                lista.append( Action.DAY_EARLIER )
            elif action == "d+":
                lista.append( Action.DAY_LATER)
            elif action == "t-":
                lista.append( Action.TIME_EARLIER )
            elif action == "t+":
                lista.append( Action.TIME_LATER )
            else:
                raise ValueError(f'Translation {action} is incorrect!')
        return lista

    def get(self, term: Term) -> Lesson:
        lesson_time = term.count_time
        lesson_day = term.day.value
        lesson = self.table[lesson_day][1][lesson_time]
        return lesson
