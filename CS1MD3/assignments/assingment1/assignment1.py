def is_valid_number(num: str) -> bool:
    
    if (num.replace(".","", 1).lstrip("-").isnumeric()) and not(num.startswith(".")) :
        return True
    return False

def is_valid_term(term: str) -> bool:
    valid_term = (term[0].isdigit() or term[0].startswith("-")) and (term[0] != "0" and term[0:2] != "-x") and not(term.startswith(".")) and term.replace(".","", 1).lstrip("-").replace("x", "" , 1).replace("^","",1).isnumeric()
    if  term.count('^') == 1:
        checking_point = term.find('^')
        return term[checking_point + 1:].isnumeric() and valid_term
    elif term.count('^') >= 0:
        return valid_term
    else:
        return False

def approx_equal(x: float, y: float, tol: float) -> bool:
    return (round(abs(x-y), 10) <= tol)


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




#Do not worry about the code past this point. 
#********************************************

def derive(poly):
    derivative = []
    degree = 1
    for coefficient in poly[1:]:
        derivative.append(coefficient*degree)
        degree += 1
    return derivative

def get_coefficients(terms):
    poly = []
    degree = 0
    for term in terms:
        while degree != degree_of(term):
            poly.append(0)
            degree += 1
        poly.append(get_coefficient(term))
        degree +=1
    return poly

def evaluate(poly, x):
    value = 0
    degree = 0
    for coefficient in poly:
        degree += 1
        value += coefficient * x**degree
    return value
        

if __name__ == "__main__":
    poly_string = input("Please enter a polynomial: ")
    terms = poly_string.strip().split("+")

    valid_poly = True
    for term in terms:
        if not is_valid_term(term):
            valid_poly = False

    while not valid_poly:
        poly_string = input("Incorrect format. Please enter a polynomial: ")
        terms = poly_string.strip().split("+")

        valid_poly = True
        for term in terms:
            if not is_valid_term(term):
                valid_poly = False
            
    poly = get_coefficients(terms)
    derivative = derive(poly)
    current_value = float(input("Please enter a starting point: "))
    tol = float(input("Please enter a tolerance: "))
    
    next_value = current_value - (evaluate(poly, current_value)/evaluate(derivative, current_value))
    while not(approx_equal(current_value, next_value, tol)):
        current_value = next_value
        next_value = current_value - (evaluate(poly, current_value)/evaluate(derivative, current_value))
    print("The polynoimal has a 'zero' approximately at: " + str(next_value))
    
