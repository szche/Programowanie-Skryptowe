from enum import Enum


# Typ wyliczeniowy Action
class Action(Enum):
    DAY_EARLIER = 0
    DAY_LATER = 1
    TIME_EARLIER = 2
    TIME_LATER = 3
