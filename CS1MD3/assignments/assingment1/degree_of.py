def is_valid_term(term: str) -> bool: 
    valid_term = (term[0].isdigit() or term[0].startswith("-")) and (term[0] != "0" and term[0:2] != "-x") and not(term.startswith(".")) and term.replace(".","", 1).lstrip("-").replace("x", "" , 1).replace("^","",1).isnumeric()
    if  term.count('^') == 1:
        checking_point = term.find('^')
        return term[checking_point + 1:].isnumeric() and valid_term
    elif term.count('^') >= 0:
        return valid_term
    else:
        return False
    

def degree_of(term: str) -> int:
    if is_valid_term(term):
        if term.count('^') == 0 and term.count('x') == 0:
            return 0
        elif term.count('x') == 1 and term.count('^') == 0:
            return 1
        elif term.count('^') == 1:
            check_start = term.find('^') 
            return int(term[check_start + 1:])
    else:
            return False
        
print(degree_of(""))
        
"""
    Returns the degree of term, it is assumed that term is a valid term.
    See the corresponding .pdf for a definition of a valid term.

    >>> degree_of("55x^6")
    6
    >>> degree_of("-1.5x")
    1
    >>> degree_of("252.192")
    0
"""
    #TODO
    