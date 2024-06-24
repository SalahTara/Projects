#include <stdio.h>
#include <stdlib.h>

int main()
{
    double num1;
    double num2;
    double result[20];
    char op;

    printf("Pick the first number: ");
    scanf("%lf", &num1);
    printf("Enter Operator: ");
    scanf(" %c", &op); // mult(x), add(+), divide(/), subtract(-)
    printf("Pick the second number: ");
    scanf("%lf", &num2);
    
    if (op == '+') {
        printf("%f\n", num1 + num2);
    }
    else if (op == '-') {
        printf("%f\n", num1 - num2);

    }
    else if (op == 'x') {
        printf("%f\n", num1 * num2);
    }
    else if (op == '/') {
        printf("%f\n", num1 / num2);
    }
    else {
        printf("Enter a valid operator\n");
    }

    
    return 0;
}