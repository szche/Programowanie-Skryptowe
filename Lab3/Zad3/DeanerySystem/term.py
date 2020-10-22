from .day import Day

class Term:
    def __init__(self, day, hour, minute, duration=90):
        self.hour = hour
        self.minute = minute
        self.duration = duration
        self.__day = day

    def __str__(self):
        return "{} {}:{} [{}]".format(self.__day, self.hour, self.minute, self.duration)

    def earlierThan(self, termin):
        self_time = self.count_time()
        termin_time = termin.count_time()
        if self_time < termin_time:
            return True
        return False

    def laterThan(self, termin):
        self_time = self.count_time()
        termin_time = termin.count_time()
        if self_time > termin_time:
            return True
        return False

    def equals(self, termin):
        self_time = self.count_time()
        termin_time = termin.count_time()
        if self_time == termin_time:
            return True
        return False

    def count_time(self):
        return self.hour * 60 + self.minute

    # zad za 2 pkt
    def minuteDifference(self, term):
        my_term_duration = self.count_time() 
        other_term_duration = term.count_time()
        duration = abs(my_term_duration - other_term_duration)
        return Term(self.__day, self.hour, self.minute, duration)

    def endTime(self):
        next_time = to_hours_minutes(self.count_time() + self.duration) 
        return Term(self.__day, next_time["hour"], next_time["minute"], self.duration) 




def to_hours_minutes(time):
    schedule = {
        "hour": None,
        "minute": None,
    }
    schedule["hour"] = time//60
    schedule["minute"] = time - schedule["hour"]*60
    return schedule
