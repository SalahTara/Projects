#include <stdio.h>
#include <stdlib.h>

double cubed();

int main()
{
    printf("Answer: %f\n", cubed(3.0));
    return 0;
}

double cubed(double num) {
    double result = num * num * num;
    return result;
}