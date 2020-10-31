class BasicTerm:
    def __init__(self, hour, minute, duration):
        self.hour = hour
        self.minute = minute
        self.duration = duration

    @property
    def hour(self):
        return self.__hour

    @hour.setter
    def hour(self, var):
        self.__hour = var

    @property
    def minute(self):
        return self.__minute

    @minute.setter
    def minute(self, var):
        self.__minute = var

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

    @property
    def count_time(self):
        return self.hour * 60 + self.minute
