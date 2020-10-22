from DeanerySystem.term import Term

term1 = Term(8, 30)
term2 = Term(9, 45, 30)
term3 = Term(9, 45, 90)

# Operator <
def test_lt():
    assert (term1 < term2) == True

# Operator <=
def test_le():
    assert (term1 <= term2) == True

# Operator >
def test_gt():
    assert (term1 > term2) == False

# Operator >=
def test_ge():
    assert (term1 >= term2) == False

# Operator ==
def test_eq():
    assert (term2 == term2) == True
    assert (term2 == term3) == False 

# Operator -
def test_sub():
    assert (term3 - term1) == Term(8, 30, 165)


