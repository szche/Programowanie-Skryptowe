import sys
st = [len(line) for line in sys.stdin.read().split()]
print({ i: st.count(i) for i in sorted(st)})

"""
import sys; st = [len(line) for line in sys.stdin.read().split()]; print({ i: st.count(i) for i in sorted(st)})
"""
