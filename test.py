'''def dot_product(vector1: list, vector2: list) -> int:
    total = 0
    for i in range(len(vector1)):
        total += vector1[i] * vector2[i]
    return total
    
print(dot_product([1,2,3], [4,5,6]))
'''

'''
def perfect_squares(n: int) -> int:
    total = 0
    for i in range(0, n+1):
        if i**(1/2) == int(i**(1/2)):
            total += 1
    return total
print(perfect_squares(1000))
'''    