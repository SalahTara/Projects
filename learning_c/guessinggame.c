#include <stdio.h>
#include <stdlib.h>

int main()
{
    int numofguesses = 1;
    int secretNumber = 5;
    int guess;
    while (guess != secretNumber && numofguesses <= 3) {
        printf("Enter a number: ");
        scanf("%d", &guess);
        numofguesses++;
    }
    
    if (guess == secretNumber){
        printf("You got it Right! The secret number was %d\n", secretNumber);
    }
    else {
        printf("You didn't get it right! The secret number was %d\n", secretNumber);
    }
    return 0;
}