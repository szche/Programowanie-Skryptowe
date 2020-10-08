#-*- coding: utf-8 -*-

# Podpunkt 2)

lancuch1 = """Litwo! Ojczyzno moja! Ty jesteś jak zdrowie;
Ile cię trzeba cenić, ten tylko się dowie;
Kto cię stracił. Dziś piękność twą w całej ozdobie
Widzę i opisuję, bo tęsknię po tobie."""

lancuch2 = """Tymczasem, przenoś moją duszę utęsknioną
Do tych pagórków leśnych, do tych łąk zielonych,
Szeroko nad błękitnym Niemnem rozciągnionych;
Do tych pól malowanych zbożem rozmaitem,
Wyzłacanych pszenicą, posrebrzanych żytem;
Gdzie bursztynowy świerzop, gryka jak śnieg biała,
Gdzie panieńskim rumieńcem dzięcielina pała,
A wszystko przepasane jakby wstęgą, miedzą
Zieloną, na niej zrzadka ciche grusze siedzą."""


# Podpunkt 3)
print( (lancuch1 + lancuch2) * 3)
print("=" * 50)

# Podpunkt 4)
lancuch = """Śród takich pól przed laty, nad brzegiem ruczaju,
Na pagórku niewielkim, we brzozowym gaju,
Stał dwór szlachecki, z drzewa, lecz podmurowany;
Świeciły się z daleka pobielane ściany,
Tym bielsze, że odbite od ciemnej zieleni
Topoli, co go bronią od wiatrów jesieni. 
Dom mieszkalny niewielki, lecz zewsząd chędogi,
I stodołę miał wielką, i przy niej trzy stogi
Użątku, co pod strzechą zmieścić się nie może."""

# Podpunkt 5)
print( lancuch[0] )     # 1) pierwszy znak lancucha
print("\n")
print( lancuch[:2] )    # 2) dwa pierwsze znaki
print("\n")
print( lancuch[2:] )    # 3) wszystkie znaki, za wyjatkiem dwoch pierwszych znakow
print("\n")
print( lancuch[-2] )    # 4) przedostatni znak lancucha
print("\n")
print( lancuch[-3:] )   # 5) trzy ostatnie znaki
print("\n")
print( lancuch[::2] )   # 6) wszystkie znaki na pozycjach parzystych
print("-" * 20)

# Podpunkt 6)
try:
    lancuch[0] = "B"
except:
    print(" --- Wystapil blad podczas podmiany pierwszego znaku w lancuchu --- ")
