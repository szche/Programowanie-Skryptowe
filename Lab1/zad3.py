

lista = ["a", "b", "c", "d", "e", "f", "g"]

for x, element in enumerate(lista):
    print("Tab[{}] = {}".format(x, element))


slownik = {}
for x, element in enumerate(lista):
    slownik[x] = element

for key in slownik:
    print("Hash[{}] = {}".format(key, slownik[key]))
