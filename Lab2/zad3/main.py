import sys
from typy import slowniki
from typy import listy

# Jesli nie podano z ktorego modulu korzystac, skoncz program
if len(sys.argv) <= 2:
    sys.exit("Podano zbyt malo argumentow")

if sys.argv[1] == "--lista":
    listy.zapisz( sys.argv[2::] )
elif sys.argv[1] == "--slownik":
    slowniki.zapisz( sys.argv[2::] )
else:
    sys.exit("Nie znam tego modulu")

