def encrypt_letter(letter: str, key: int) -> str:
    return chr(ord(letter) + key)

'''print(encrypt_letter('a', 1))
encrypt_letter('a', 1) 
'b
'''
s = 'I love cats'
def encrypt_message(message: str, key: int) -> str:
    new_message = ""
    for char in message:
        new_message = new_message + encrypt_letter(char, key) 
        print(new_message)
        
print(encrypt_message(s, 1))

def decrypt_message(message: str, key: int) -> str:
    new_message = ""
    for char in message:
        new_message = new_message + encrypt_letter(char, key) 
        print('new message: ' + new_message)
