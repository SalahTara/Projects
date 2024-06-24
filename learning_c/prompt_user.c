#include <stdio.h>
#include <stdlib.h>

int main()
{
    double gpa;
    char name[20];
    //printf("Enter your gpa: ");
    // scanf("%lf", &gpa);
    printf("Enter your name: ");
    fgets(name, 20, stdin);
    //printf("Your age is: %f\n", gpa);
    printf("Your name is: %s\n ", name);

    return 0;
}