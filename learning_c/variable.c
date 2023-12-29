#include <stdio.h>
#include <stdlib.h>

int main()
{
    char name[] = "Sneed";
    int  age = 19;
    printf("Hello my name is %s.\n", name); // %s (place-holder for letters)
    printf("I am %d years old and I'm learning C.\n", age); // %d (place-holder for digits)
    printf("It's not looking good!\n");

    age = 21;
    printf("I just turned %d and I think I got it now.\n", age);
    return 0;
}