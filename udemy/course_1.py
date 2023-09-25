'''
age1 = 20
print(age1)

sentence = "my name is sneed"
print(sentence)

sarah, bob, mike = 16, 21, 17
sarah = bob = mike = 17
print(bob)

name, age = "Salah", 19
print(name, age)
'''
'''
age1 = 12
age2 = 18

print(age1+age2)
print(age1-age2)
print(age1*age2)
print(age1/age2)
print(age1%age2)

sent1 = "today is a beautiful day"
print(sent1)

first_name = "Salah"
last_name = "Altara"

print(first_name+" "+last_name)

sent2 = "salah was playing basketball"
print(sent2[0:5])
'''

# Placeholders in strings
# %s for strings
# %d for integers

'''
sentence = "%s is %d years old"
print(sentence % ("Barrack", 60))
'''
#Format Strings
#f""
'''
name = "Salah"
print(f"Hello, {name}")

x = 10
y = 20
print(f"The sum of x and y is {x+y}")
'''
#Exercises
'''
sum = (15+30)/2
print(sum)

x = 3
y = 2
print(x+y)
print(x-y)
print(x*y)
print(x/y)
print(x%y)

name = "Salah"
a, b, c = "apple", "banana", "orange"
print("Hello"*10)

name1, age = "Salah", 19

first_name = "Salah"
last_name = "Altarabichi"
full_name = first_name +" "+ last_name
print(full_name)

z = "abcdef"
print(z[0:5])

pi = "abcdefghijklmnopqrstuvwxyz"
print(pi[1:])
'''
#Lists
'''
shopping_list = ['apples','oranges', 'bananas', 'cheese']
shopping_list.append('bluberries')
shopping_list[0] = 'cherries'
del shopping_list[1]
print(len(shopping_list))
print(shopping_list)

list_num = [1,4,7,23,6]
print(max(list_num))
print(min(list_num))
'''
#Dictionaries
'''
students = {'bob': 12, 'rachel': 13, 'emily': 15}
students['rachel'] = 14
del students['emily']
print(students['rachel'])
print(students)
print(len(students))
'''
#Tuples
'''
tup = ('oranges', 'apples', 'Bananas')
tup2 = (12, 14)
print(tup + tup2)
#tup[0] = 'cherries' produces an error
print(tup[0:2])
'''
#Exercises_2
'''
groceries = [1, 2, 3]
print(groceries[1])

sports = ["basketball", "football", "baseball"]
sports[1] = "futsal"
print(sports)

numbers = [1, 2, 3, 4, 5]
del numbers[4]
print(numbers)

numbers2 = [6, 7, 8, 9, 10]
print(numbers + numbers2)
print(len(numbers))
print(min(numbers))
print(max(numbers))

students = {"Bob": 95, "Sarah": 100, "Chuck": 78}
print(students["Bob"])

names = {"A": 15, "B": 16, "C": 17}
del names["B"]
print(names)


students2 = {"Boba": 95, "Saraha": 100, "Chucke": 78}
print(students2)

tup = ("1", "2","3","4","5")
print(tup[0:3])
'''

#Conditional Statement
'''
if 1 > 2:
    print("Sneed")
elif 2 > 1:
    print("Seed")
else:
    print("Chuck")
'''

#For Loops
'''
list1 = ['apples', 'bananas', 'cherries']
tup1 = (2, 6 ,10)

#for item in tup1:
    #print(item)

for i in range(0,5):
    for j in range(0,3):
        print(i*j)
'''
#While Loops
# 3 control statements - break, continue, pass
'''
c = 0
while c < 5:
    c = c + 1
    if c == 3:
        pass
    print(c)
'''

#Try and Except
# Useful in situations when exceptions may be raised
'''
try:
    if name > 3:
        print('Hello')
except:
    print('An error was detected. Check your code')
'''

#Functions
'''
def hello():
    print("Hello world")

def greeting(name):
    print("Hi " + name + "!")
greeting('Salah')

def math(x, y):
    print( x + y)

math(3, 5)
'''

#Built-in Python function
'''
abs(-23) #Absolute Value
print(bool(2)) # 0 or none = False, x > 0 = True
print(dir('hello')) # Displays all string options

#eval
sent = 'print("Hello")'
eval(sent)

#exec, eval but for more lines

#str, int, float
print('Hello ' + str(100))
print(123 + int('456'))
print(float('123.45')+1.2)
'''
#Coding Exercise
'''
num = int(input("Enter a number: "))    
factorial = 1    
if num < 0:    
   print(" Factorial does not exist for negative numbers")    
elif num == 0:    
   print("The factorial of 0 is 1")    
else:    
   for i in range(1,num + 1):    
       factorial = factorial*i    
   print("The factorial of",num,"is",factorial)
   ''' 

# OOP - Classes and Objects
'''
class Person:
   def __init__(self, name, age):
      self.name = name
      self.age = age
   def getName(self):
      return self.name
   def getAge(self):
     return self.age
p = Person("Bob", 22)
print(p.getAge())
'''

#OOP - Class Inheritance

class Car:
    def __init__(self):
        self.wheels = 4
        self.seats = 5

    def drive(self):
        print('Driving a car...')
        
class SportsCar(Car):
    def __init__(self):
        super().__init__()
        self.engine_power = "400HP"
        self.seats = 2

    def drive(self):
        print('Driving a sports Car')

mySportsCar = SportsCar()
mySportsCar.drive()
