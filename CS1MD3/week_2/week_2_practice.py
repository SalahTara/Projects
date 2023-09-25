'''a=2
c=4

def math1(x,y,z):
	z = a + 1
	c = x + 1
	y = c + 1
	return x + y + z

print(a) = 2
print(math1(a,a,a)) = 9
print(c) = 4
z is an error

#math1(1,1,1)
#error a is not defined

a = 1
x = 2
def math2(a,b,c):
	a = a + c
	b = math1(a,b,c)
	c = x + 1
	return a + b + c

print(math2(x,a,x)) = 19
print(x) = 2
print(a) = 1

a = 1
x = 1
def math3(a,b,c):
	a = a + c
	b = math1(a,b,c)
	x = 5
	c = x + 1
	print(a)
	print(b)
	print(c)
	return a + b + c

def math4(a,b,c):
	a = a + c
	b = math1(a,b,c)
	c = x + 1
	x = 5
	return a + b + c

print(math4(1,1,1)) error, because x is assigned after c
print(x) = 1
'''
'''
def print_circle_info(radius):
	str_area = str(3.14*(radius**2))
	str_circum = str(2*3.14*radius)
	print("The area of the circle is:" +" "+ str_area)
	print("The circumference of the circle is:" +" "+ str_circum)
'''
#print_circle_info(5) = 78.54, 31.4


'''
def in_range(r: int) -> bool:
	return r >= 1 and r<= 3
'''
#4. A

# 6. Triangle	
'''
def exists_triangle(x : float, y : float, z : float) -> bool:
    sides = [x,y,z]
    sides.sort()
    return (min(x,y,z))**2 + (sides[1])**2 == (max(x,y,z))**(2)
print(exists_triangle(3, 4, 5))
'''

#7. Write a function that takes the coefficients from ax^2 + bx + c and 
#returns the largest solution to the quadratic equation. You may assume that
#input will always have real solutions. 
'''
def solver(a : float, b : float, c: float) -> float:
    x = max((-b + (((b)**2 - 4 * a * c)**0.5))/(2*a),(-b - (((b)**2 - 4 * a * c)**0.5))/(2*a))
    return x
print(solver(1, -6, 9))
'''
