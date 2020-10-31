from .day import Day, nthDayFrom
from .term import Term, to_hours_minutes
from .action import Action

class Lesson:
    # Dozwolone terminy dla studiow stacjonarnych
    full_time_allowed_terms = {
        Day.MON: (480, 1200),
        Day.TUE: (480, 1200),
        Day.WED: (480, 1200),
        Day.THU: (480, 1200),
        Day.FRI: (480, 1020),
    }

    # Dozwolone terminy dla studiow niestacjonarnych
    part_time_allowed_terms = {
        Day.FRI: (1020, 1200),
        Day.SAT: (480, 1200),
        Day.SUN: (480, 1200), 
    }

    def __init__(self, term, name, teacherName, year, full_time=True, skipBreaks=True):
        self.term = term
        self.name = name
        self.teacherName = teacherName
        self.year = year
        self.full_time = full_time
        self.allowed_terms = full_time
        self.skipBreaks = skipBreaks

    
    @property
    def term(self):
        return self.__term

    @term.setter
    def term(self, var):
        self.__term = var

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, var):
        self.__name = var

    @property
    def teacherName(self):
        return self.__teacherName

    @teacherName.setter
    def teacherName(self, var):
        self.__teacherName = var

    @property
    def year(self):
        return self.__year

    @year.setter
    def year(self, var):
        self.__year = var

    @property
    def full_time(self):
        return self.__full_time

    @full_time.setter
    def full_time(self, var):
        self.__full_time = var

    @property
    def allowed_terms(self):
        return self.__allowed_terms

    @allowed_terms.setter
    def allowed_terms(self, var):
        if var == True:
            self.__allowed_terms = Lesson.full_time_allowed_terms
        else:
            self.__allowed_terms = Lesson.full_time_allowed_terms

    # Dla latwiejszych testow
    def __eq__(self, other):
        for item in self.__dict__:
            if self.__dict__[item] != other.__dict__[item]: return False
        return True

    def __str__(self):
        slownik_lat = {
            1: "Pierwszy",
            2: "Drugi",
            3: "Trzeci",
            4: "Czwarty",
            5: "Piaty"
        }
        slownik_studiow = {
            True: "stacjonarnych",
            False: "niestacjonarnych"
        }
        ending_time = to_hours_minutes( self.term.count_time + 90 )
        return f'{self.name} ({self.term.day} {self.term}-{ending_time["hour"]}:{ending_time["minute"]:02d})\n' + \
                f'{slownik_lat[self.year]} rok studiów {slownik_studiow[self.full_time]}\n' + \
                f'Prowadzący: {self.teacherName}'


    def moveDay(self, n):
        moved_day = nthDayFrom(n, self.term.day)
        # Sprawdz czy dzien jest dozwolony
        if moved_day not in self.allowed_terms.keys():
            print("Nie mozna przeniesc tych zajec!")
            return
        # Sprawdz czy godziny sa dozwolone gdybysmy przeniesli
        # a) Jesli czas rozpoczecie jest zbyt wczesnie
        # b) Jesli czas zakonczenia jest zbyt pozno
        if self.term.count_time < self.allowed_terms[moved_day][0] or\
                (self.term.count_time + 90) > self.allowed_terms[moved_day][1]:
            print("Nie mozna przeniesc tych zajec!")
            return
        # Wszystko sie zgadza, mozna przenosic
        self.term.day = moved_day

    def earlierDay(self):
        self.moveDay(-1)

    def laterDay(self):
        self.moveDay(1)

    def earlierTime(self):
        earlier_begin_time = self.term.count_time - 90
        # Sprawdz czy godziny sa dowzolone
        if earlier_begin_time < self.allowed_terms[self.term.day][0]:
            print("Nie mozna przeniesc tych zajec!")
            return
        # Wszystko sie zgadza, mozna przenosic
        new_time = to_hours_minutes( earlier_begin_time )
        self.term.hour = new_time["hour"]
        self.term.minute = new_time["minute"]

    def laterTime(self):
        later_begin_time = self.term.count_time + 90
        later_end_time = self.term.count_time + 180
        # Sprawdz czy godziny sa dowzolone
        if later_end_time > self.allowed_terms[self.term.day][1]:
            print("Nie mozna przeniesc tych zajec!")
            return
        # Wszystko sie zgadza, mozna przenosic
        new_time = to_hours_minutes( later_begin_time )
        self.term.hour = new_time["hour"]
        self.term.minute = new_time["minute"]

    def move(self, action: Action):
        print(action)
        if action == Action.DAY_EARLIER:
            self.earlierDay()
        elif action == Action.DAY_LATER:
            self.laterDay()
        elif action == Action.TIME_EARLIER:
            self.earlierTime()
        elif action == Action.TIME_LATER:
            self.laterTime()
    
