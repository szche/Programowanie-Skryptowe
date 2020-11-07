from main import Operacje

def test_suma(capsys):
    op = Operacje()
    op.suma(1,2,3) #Wypisze: 1+2+3=6
    captured = capsys.readouterr()
    assert captured.out == "1+2+3=6\n"

    op.suma(1,2) #Wypisze: 1+2+4=7 - 4 jest pobierana z tablicy 'argumentySuma'
    captured = capsys.readouterr()
    assert captured.out == "1+2+4=7\n"

    op.suma(1) #Wypisze: 1+4+5=10 - 4 i 5 są pobierane z tablicy 'argumentySuma'
    captured = capsys.readouterr()
    assert captured.out == "1+4+5=10\n"


def test_roznica(capsys):
    op = Operacje()
    op.roznica(2,1) 
    captured = capsys.readouterr()
    assert captured.out == "2-1=1\n"

    op.roznica(2) 
    captured = capsys.readouterr()
    assert captured.out == "2-4=-2\n"

    wynik = op.roznica() 
    assert wynik == 6


def test_changesuma(capsys):
    op = Operacje()
    op['suma'] = [1,2]

    op.suma(1,2) #Wypisze: 1+2+1=4 - 1 jest pobierana z tablicy 'argumentySuma'
    captured = capsys.readouterr()
    assert captured.out == "1+2+1=4\n"

    op.suma(7) #Wypisze: 7+1+2=10 - 1, 2 jest pobierana z tablicy 'argumentySuma'
    captured = capsys.readouterr()
    assert captured.out == "7+1+2=10\n"


def test_changeroznica(capsys):
    op = Operacje()
    op['roznica'] = [1,2,3]

    op.roznica(3) 
    captured = capsys.readouterr()
    assert captured.out == "3-1=2\n"

    wynik = op.roznica() 
    captured = capsys.readouterr()
    assert captured.out == "1-2=-1\n"
    assert wynik == 3
