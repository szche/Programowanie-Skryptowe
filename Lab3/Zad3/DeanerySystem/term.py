from .day import Day

class Term:
    def __init__(self, day, hour, minute):
        self.hour = hour
        self.minute = minute
        self.duration = 90 
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


