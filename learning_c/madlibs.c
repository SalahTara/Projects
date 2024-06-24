#include <stdio.h>
#include <stdlib.h>

int main()
{
    char color[20];
    char pluralNoun[20];
    char foodL[20];
    char foodR[20];

    printf("Enter a color: ");
    scanf("%s", color);
    printf("Enter a PLural noun: ");
    scanf("%s", pluralNoun);
    printf("Enter a food: ");
    scanf("%s%s", foodL, foodR);

    printf("Roses are %s\n", color);
    printf("%s are blue\n", pluralNoun);
    printf("I love %s%s\n", foodL, foodR);
    return 0;
}