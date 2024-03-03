#include <stdio.h>
#include <stdlib.h>

#define N 9
int solvesudoku(int, int);
int same3x3(int, int, int);
int samerow(int, int, int);
int samecol(int, int, int);
void printgrid();
int count = 0;
int grid[N][N] = {
    {0 , 2 , 0 , 0 , 0 , 0 , 0 , 0 , 0} ,
    {0 , 0 , 0 , 6 , 0 , 0 , 0 , 0 , 3} ,
    {0 , 7 , 4 , 0 , 8 , 0 , 0 , 0 , 0} ,
    {0 , 0 , 0 , 0 , 0 , 3 , 0 , 0 , 2} ,
    {0 , 8 , 0 , 0 , 4 , 0 , 0 , 1 , 0} ,
    {6 , 0 , 0 , 5 , 0 , 0 , 0 , 0 , 0} ,
    {0 , 0 , 0 , 0 , 1 , 0 , 7 , 8 , 0} ,
    {5 , 0 , 0 , 0 , 0 , 9 , 0 , 0 , 0} ,
    {0 , 0 , 0 , 0 , 0 , 0 , 0 , 4 , 0 }};

int main ( )
{   
    int x = 0;
    int y = 0;

    printf("The input Sudoku puzzle:\n" ) ;
    printgrid();
    printf("\n\n");

    if(solvesudoku(x, y)) {
        printf("Solution found after %d iterations:\n", count);
        printgrid();
    }
    else {
        printf("No solution exists");
    }
    return 0;
}

int solvesudoku(int, int) {
    return 0;

}

int same3x3(int, int, int) {
    return 0;

}

int samerow(int, int, int)
{
    return 0;
}

int samecol(int, int, int)
{
    return 0;
}

void printgrid()
{
    printf("-------------------------\n");
    for (int i = 0; i < 9; i++) {
        if (i % 3 == 0 && i != 0)
        {
            printf("-------------------------\n");
        }
        for (int j = 0; j < 9; j++) {
            if (j % 3 == 0)
            {
                printf("| ");
            }
            printf("%d ", grid[i][j]);
            if (j == 8) {
                printf("| ");
            }
        }
    printf("\n");
    }
    printf("-------------------------\n");   
}