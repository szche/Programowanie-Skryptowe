from enum import Enum


class Day(Enum):
    MON = 0
    TUE = 1
    WED = 2
    THU = 3
    FRI = 4
    SAT = 5
    SUN = 6

    def difference(self, day):
        diff = day.value - self.value
        if diff >= 6:
            return diff - 7
        elif diff <= -6:
            return diff + 7
        return diff
    
    def __str__(self):
        slownik = {
            Day.MON: "Poniedzialek",
            Day.TUE: "Wtorek",
            Day.WED: "Sroda",
            Day.THU: "Czwartek",
            Day.FRI: "Piatek",
            Day.SAT: "Sobota",
            Day.SUN: "Niedziela"
        }
        return slownik[self]

def nthDayFrom(n, day):
    return  Day( (day.value + n)%7 ) 

if __name__ == "__main__":
    day = Day.MON
    nthDayFrom(3, day)

    Day.SUN.difference(Day.MON)
