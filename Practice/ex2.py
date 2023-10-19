def before_sum(num: int):
    sum = num + (num-1)
    if num <= 9 and num >= 1:
        return ("Current Number " + str(num) + " Previous number " + str(num-1) + " Sum: " + str(sum))
    elif num == 0:
        return ("Current Number " + str(0) + " Previous number " + str(0) + " Sum: " + str(0))
    else:
        return ("Number is not in Range")
print(before_sum(10))