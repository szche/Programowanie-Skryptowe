from .term import Term, to_hours_minutes



class Break:
    def __init__(self, term):
        if term.day != None:
            print("Term has a day value!")
            raise ValueError
        self.term = term

    def __str__(self):
        return "Przerwa"
    
    def getTerm(self):
        break_start_time = to_hours_minutes( self.term.count_time )
        break_end_time = to_hours_minutes( self.term.count_time + self.term.duration )
        result = f'Przerwa {break_start_time["hour"]}:{break_start_time["minute"]}' + \
                f'-{break_end_time["hour"]}:{break_end_time["minute"]}' + \
                f' [{self.term.duration}]'
        print(result)
