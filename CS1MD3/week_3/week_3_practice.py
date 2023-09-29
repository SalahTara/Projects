s = '1234567'
'print(s[len(s)]) #error'
'''print(s[len(s) - 2]) #6
print(s[-2]) #6
print(s[-5:-2]) #345
print(s[-2:5]) #[]
print(s[-2:-2]) #[]
print(s[:-3]) #1234
print(s[0:7]) #1234567
print(s[0:6]) #123456
print(s[5:]) #67
print(s[7:]) #[]'''


#x = '0123456789'
#print(x[2::2][2])
#a) Write a single computation that first creates a String of all even numbers in x, and then finds the 3rd even number in x.

#x = '0123456789'
#print(x[::3][::-1])
'9630'
#print(x[2:8][::3])
'25'

'''def f(x):
	if x > 10:
		if x > 100:
			print("A")
		elif x > 200:
			print("B")
		else:
			print("C")
	elif x < 50:
		if x < 40:
			print("D")
		else:
			print("E")
		if x < 30:
			print("F")
		else:
			print("G")
	if x >= 10:
		print("H")
	elif x >= 10:
		print("I")'''

#(f(11))
'C, H'
#f(300)
'A, H'
#f(5)
'D, F'


#b) For each letter "A" through "I", give a value of x which will result in f(x)
#printing out that letter (it doesn't need to just print out that letter). If you
#think a specific letter can never be printed, explain why.
'''
The Value B will never be printed because for a value to be > 200 it must be > 100. So, python wont check the second condition because it has already 
met the first one (same reasoning with G,I). E will never be printed because if a number is between 41-49 then the first condition x > 10 will be met 
and the elif statement will not be checked by python.'''

def f(x):
	if x > 10:
		if x > 100:
			return 'A'
		elif x > 200:
			return "B"
		else:
			return "C"
	elif x < 50:
		if x < 40:
			return("D")
		else:
			return("E")
		if x < 30:
			return("F")
		else:
			return("G")
	if x >= 10:
		return("H")
	elif x >= 10:
		return("I")
	
#print(f(5))
'D'
#print(f(300))
'A'
#print(f(11))
'C'
# B, E, F, G, H, I Will never be returned 