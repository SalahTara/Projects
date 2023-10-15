def is_valid_number(num: str) -> bool:
    
    if (num.replace(".","", 1).lstrip("-").isnumeric()) and not(num.startswith(".")) :
        return True
    return False

print(is_valid_number(".10"))

'''
    Returns True if and only if num is represents a valid number.
    See the corresponding .pdf for a definition of what a valid number
    would be.

    >>> is_valid_number("10")
    True
    >>> is_valid_number("-124")
    True
    >>> is_valid_number("12.9")
    True
    >>> is_valid_number("12.9.0")
    False
    >>> is_valid_number("abc")
    False
    >>> is_valid_number("0-17")
    False
    '''
