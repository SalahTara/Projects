import string
import random

def password_generator():
    length = int(input("Enter Password Length: "))
    letters = int(input("How many letters?: "))
    nums = int(input("How many numbers?: "))
    specials = int(input("How many special characters?: "))
    password = ""

    if letters + nums + specials != length:
        print("The length doesn't match with your inputs.")
        password_generator()

    for i in range(letters):
        password += random.choice(string.ascii_letters)

    for i in range(nums):
        password += random.choice(string.digits)

    for i in range(specials): 
        password += random.choice(string.punctuation)
    return ''.join(random.sample(password,len(password)))

print(password_generator())