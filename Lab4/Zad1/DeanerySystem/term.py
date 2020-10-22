class Term:
    def __init__(self, hour, minute, duration=90):
        self.hour = hour
        self.minute = minute
        self.duration = duration

    def __str__(self):
        return "{}:{} [{}]".format(self.hour, self.minute, self.duration)

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
        return self.count_time == other_term.count_time and \
                self.duration == other_term.duration
    
    # overload - operator
    def __sub__(self, other_term):
        my_ending_time = self.count_time + self.duration
        other_beg_time = other_term.count_time
        duration = abs(my_ending_time - other_beg_time) 
        return Term( other_term.hour, other_term.minute, duration )

    @property
    def count_time(self):
        return self.hour * 60 + self.minute

