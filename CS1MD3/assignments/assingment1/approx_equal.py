def approx_equal(x: float, y: float, tol: float) -> bool:
    print(abs(x - y))
    return (abs(x-y) <= tol)




"""
    Returns True if and only if x and y are within tol of each other.

    >>> approx_equal(5, 4, 1)
    True
    >>> approx_equal(5, 3, 1)
    False
    >>> approx_equal(0.999, 1, 0.001)
    True
    >>> approx_equal(0.999, 1, 0.0001)
    False
    """
    
    