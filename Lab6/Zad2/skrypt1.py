import sys
inp = sys.stdin.read()
st = [len(line) for line in inp.split()]
dt = { i: st.count(i) for i in sorted(st)}
print(dt)


"""
import sys; inp = sys.stdin.read(); st = [len(line) for line in inp.split()]; dt = { i: st.count(i) for i in sorted(st)}; print(dt)
"""
