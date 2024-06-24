#include <stdio.h>
#include <stdlib.h>

int max(int num1, int num2, int num3);

int main()
{
    printf("Answer is: %d\n", max(5, 100, 20));
    return 0;
}

int max(int num1, int num2, int num3) {
    int result[20];
    if (num1 >= num2 && num1 >= num3) {
        result[20] = num1;
        }
    else if (num2 >= num1 && num2 >= num3) {
        result[20] = num2;
    }
    else {
        result[20] = num3;
        }
    return result[20];
}