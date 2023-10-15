def add(num1: int, num2: int) -> str:
    multiply = num1 * num2
    sum = num1 + num2
    if multiply <= 1000:
        return multiply
    return ("The results is " + str(sum))

add(20,30)