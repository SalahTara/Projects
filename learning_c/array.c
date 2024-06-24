#include <stdio.h>
#include <stdlib.h>

int main()
{
    // int luckyNumbers[] = {4, 8, 15, 16, 23, 42};
    // int luckyNumber[1] = 200;
    // printf("%d\n", luckyNumbers[1]);
    // return 0;

    int luckyNumbers[10];
    luckyNumbers[0] = 10;
    luckyNumbers[1] = 20;
    luckyNumbers[8] = 930;
    
    printf("%d, %d, %d\n", luckyNumbers[0], luckyNumbers[1], luckyNumbers[8]);
    return 0;
}