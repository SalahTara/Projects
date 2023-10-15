def is_valid_term(term: str) -> bool: 
    valid_term = (term[0].isdigit() or term[0].startswith("-")) and (term[0] != "0" and term[0:2] != "-x") and not(term.startswith(".")) and term.replace(".","", 1).lstrip("-").replace("x", "" , 1).replace("^","",1).isnumeric()
    if  term.count('^') == 1:
        checking_point = term.find('^')
        return term[checking_point + 1:].isnumeric() and valid_term
    elif term.count('^') >= 0:
        return valid_term
    else:
        return False
    


def get_coefficient(term: str) -> float:
    if is_valid_term(term):
        if term.count('^') == 0 and term.count('x') == 0:
            return float(term)
        elif term.count('x') == 1 and term.count('^') == 0:
            return float(term[0:term.find('x')])
        elif term.count('^') == 1:
            check_coeff = term.find('x') 
            return float(term[0:term.find('x')])
    else:
            return False
print(get_coefficient("2423x^12"))

"""
    Returns the coefficient of term, it is assumed that term is a valid term.
    See the corresponding .pdf for a definition of a valid term.

    >>> get_coefficient("55x^6")
    55
    >>> get_coefficient("-1.5x")
    -1.5
    >>> get_coefficient("252.192")
    252.192
    """