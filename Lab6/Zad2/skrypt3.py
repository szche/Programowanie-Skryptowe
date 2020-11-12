import random
import math

# Ile losowych punktow
N = 10000

# Pole kwadratu na ktorym zostala opisana figura
POLE_KWADRATU = 1*0.8

# Losowe wartosci (x, y) w zakresie kwadratu
losowe_wartosci = ((random.uniform(-0.5, 0.5), random.uniform(-0.3, 0.5)) for i in range(N))

w_srodku = len(list(filter(lambda x: (x[0] <= 0 and x[1] <= math.sqrt(0.25 - x[0]**2) and x[1] >= -math.sqrt((1-x[0]*x[0]/0.25)*0.09)) or \
                        (x[0] >= 0 and x[1] <= (-math.sqrt(-x[0] * x[0] + x[0])) + 0.5 and x[1] >= 1.2 * x[0]**2 - 0.3),
                            losowe_wartosci))) 

pole_figury = POLE_KWADRATU * (w_srodku/N)
print(f"Pole figury: {pole_figury}" )
