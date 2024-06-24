#include <stdio.h>
#include <stdlib.h>

int main()
{
    char grade = 'S';
    
    switch(grade) {
        case 'A':
            printf("You did great\n");
            break;
        case 'B':
            printf("You did well\n");
            break;
        case 'C':
            printf("You did decent\n");
            break;
        case 'D':
            printf("You did poorly\n");
            break;
        case 'F':
            printf("It's over for you\n");
            break;  
        default:
            printf("Invalid grade\n");
    }
    return 0;
}