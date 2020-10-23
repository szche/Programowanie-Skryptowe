from .day import Day, nthDayFrom

class Term:
    def __init__(self, hour, minute, day):
        self.hour = hour
        self.minute = minute
        self.day = day

    def __str__(self):
        return "{}:{:02d}".format(self.hour, self.minute)

    # overload < operator
    def __lt__(self, other_term):
        return self.count_time < other_term.count_time

    # overload <= operator
    def __le__(self, other_term):
        return self.count_time <= other_term.count_time

    # overload < operator
    def __gt__(self, other_term):
        return self.count_time > other_term.count_time

    # overload < operator
    def __ge__(self, other_term):
        return self.count_time >= other_term.count_time

    # overload == operator
    def __eq__(self, other_term):
        return self.count_time == other_term.count_time

    # overload - operator
    def __sub__(self, other_term):
        my_ending_time = self.count_time + self.duration
        other_beg_time = other_term.count_time
        duration = abs(my_ending_time - other_beg_time) 
        return Term( other_term.hour, other_term.minute, duration )

    @property
    def count_time(self):
        return self.hour * 60 + self.minute


def to_hours_minutes(time):
    schedule = {
        "hour": None,
        "minute": None,
    }
    schedule["hour"] = time//60
    schedule["minute"] = time - schedule["hour"]*60
    return schedule


