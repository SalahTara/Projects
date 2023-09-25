'''
x = 1
def f1(x):   
    if x == 1: 
        print("x = 1")
    print("Hello")
f1(1)

def f2(x):
    if x == 1:
        return "x is 1"
    return "x is not 1"
'''
'''
def f3(x):
    if x == 1:
        print("x is 1")
    elif x < 0:
        print("x is 0")
    elif x == 2:
        print("x is 2")
    print("x is positive but not 1 or 2")
f3(1000)
'''
'''
def f4(x):
    if x > 0 :
        return True
    return False
print(f4(-4))
'''
#Bad Code

'''
def f5(x):
    return x > 0
print(f5(5))
'''
#Good Code

#If puzzle 1
'''
if n > 5 and m >0:
    if n > 0
        return 1
    else:
        return 2
    elif m <= 0 or n < 6:
        return 3
        else:
            return 4
'''
'''
def puzzle1(n: int, m: int) -> int:
    if n > 5 and m >0:
        return 1
    return 2
'''

#If puzzle 2
'''
def puzzle2(n: int, m: int) -> str:
    if n > 100:
        m < 50
            return C
    return D
    '''


