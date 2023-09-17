def add(x, y):
    answer = x + y
    print(str(x)+ '+' + str(y) +'='+ str(answer) + '\n')
def sub(x,y):
    answer = x - y
    print(str(x)+ '-' + str(y) +'='+ str(answer) + '\n')
def mul(x,y):
    answer = x * y
    print(str(x)+ '*' + str(y) +'='+ str(answer) + '\n')
def div(x,y):
    answer = x/y
    print(str(x)+ '/' + str(y) +'='+ str(answer) + '\n')

while True:
    print('A. Addition')
    print('B. Subtraction')
    print('C. Multiplication')
    print('D. Division')
    print('E. Exit')

    choice = input('input your choice:')

    if choice == 'a' or choice == 'A':
        print('A. Addition')
        x = int(input('Input first number:'))
        y = int(input('Input second number:'))
        print(add)
    elif choice == 'b' or choice == 'B':
        print('B. Subtraction')
        x = int(input('Input first number:'))
        y = int(input('Input second number:'))
        sub(x, y)
    elif choice == 'c' or choice == 'C':
        print('C. Multiplication')
        x = int(input('Input first number:'))
        y = int(input('Input second number:'))
        mul(x, y)
    elif choice == 'd' or choice == 'D':
        print('D. Division')
        x = int(input('Input first number:'))
        y = int(input('Input second number:'))
        div(x, y)
    elif choice == 'e' or choice == 'E':
        print('Program Ended')
        quit()    
