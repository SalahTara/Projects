def get_even(L: list()) -> list():
    new_list = []
    for num in L:
        if num%2 == 0:
            new_list.append(num)
    return new_list      
print(get_even([2,3,4]))

def get_even_average(L: list()) -> float:
    new_list = []
    for num in L:
        if num%2 == 0:
            L.append(num)
            
    return 
print(get_even_average([2,4,1]))    
