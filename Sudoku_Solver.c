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

int main()
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
        printf("No solution exists\n");
    }
    return 0;
}

int solvesudoku(int x, int y) {
    count++;
    int sudoku_value = 1;
    int temp_x = 0;
    int temp_y = 0;
    // Case 1: If the cell is not empty
    if (grid[x][y] != 0) {
        if ((x == 8) && (y == 8)) {
            return 1; // solved
        }
        if (x < 8) {
            x++; // move to next cell to the right
        }
        else {
            x = 0;
            y++; // move to next row
        }
        if(solvesudoku(x, y)) {
            return 1;
        }
        else {
            return 0;
        }   
    }
    // Case 2: If the cell is empty
    if (grid[x][y] == 0) {
        while (sudoku_value < 10) {
            if (!same3x3(x,y,sudoku_value) && !samecol(x,y,sudoku_value) && !samerow(x,y,sudoku_value)) {
                grid[x][y] = sudoku_value;
                if ((x == 8) && (y == 8)) {
                    return 1; // solved
                }
                if (x < 8) {
                    temp_x = x+1; // move to next cell to the right
                }
                else {
                    temp_x = 0;
                    temp_y = y+1; // move to next row
                }
                if(solvesudoku(temp_x, temp_y)) {
                    return 1;
                }
            }
            sudoku_value++;
        }
        grid[x][y] = 0;
        return 0;
    }
}

int same3x3(int x, int y , int sudoku_value) {
    if (x < 3) {
        x = 0;
    }
    else if (x < 6) {
        x = 3;
    }
    else {
        x = 6;
    }
    if (y < 3) {
        y = 0;
    }
    else if (y < 6) {
        y = 3;
    }
    else {
        y = 6;
    }
    for (int i = x; i < x+3; i++) {
        for (int j = y; j < y+3; j++) {
            if (grid[i][j] == sudoku_value) {
                return 1;
            }
        }
    }
    return 0;
}

int samerow(int x, int y, int sudoku_value)
{
    for (int i = 0; i < 9; i++) {
        if (grid[i][y] == sudoku_value) {
            return 1;
        }
    }
    return 0;
}

int samecol(int x, int y, int sudoku_value)
{

    for (int i = 0; i < 9; i++) {
        if (grid[x][i] == sudoku_value) {
            return 1;
        }
    }
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
// End of code
