def add(num1: int, num2: int) -> str:
    multiply = num1 * num2
    sum = num1 + num2
    if multiply <= 1000:
        return ("The result is " + str(multiply))
    return ("The result is " + str(sum))

print(add(40,30))