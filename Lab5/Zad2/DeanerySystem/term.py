from .day import Day, nthDayFrom
from .basicterm import BasicTerm

class Term(BasicTerm):
    def __init__(self, hour, minute, day, duration=90):
        super().__init__(hour, minute, duration)
        self.day = day

    @property
    def day(self):
        return self.__day

    @day.setter
    def day(self, var):
        self.__day = var

    def __str__(self):
        return "{}:{:02d}".format(self.hour, self.minute)


    # overload - operator
    def __sub__(self, other_term):
        my_ending_time = self.count_time + self.duration
        other_beg_time = other_term.count_time
        duration = abs(my_ending_time - other_beg_time) 
        return Term( other_term.hour, other_term.minute, duration )



def to_hours_minutes(time):
    schedule = {
        "hour": None,
        "minute": None,
    }
    schedule["hour"] = time//60
    schedule["minute"] = time - schedule["hour"]*60
    return schedule


