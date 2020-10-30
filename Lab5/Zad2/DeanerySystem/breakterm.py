from .term import Term, to_hours_minutes
from .basicterm import BasicTerm



class Break(BasicTerm):
    def __str__(self):
        return "Przerwa"
    
    def getTerm(self):
        break_start_time = to_hours_minutes( self.count_time )
        break_end_time = to_hours_minutes( self.count_time + self.duration )
        result = f'Przerwa {break_start_time["hour"]}:{break_start_time["minute"]}' + \
                f'-{break_end_time["hour"]}:{break_end_time["minute"]}' + \
                f' [{self.duration}]'
        print(result)
