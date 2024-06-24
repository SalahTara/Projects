// #include <stdio.h>


// int main () {
//     int a = 42; // Declare and initialize an integer variable
//     int *p ; // Declare a pointer to an integer
//     p = &a ; // Assign the address of ’a’ to the pointer ’p’
//     /* or we could use int *p = &a;*/
//     printf (" Value of ’a ’: %d\n", a ) ;
//     printf (" Address of ’a ’: %p\n", &a) ; // %p is placeholder
//     printf (" Value of ’p’ ( address of ’a ’): %p\n", p ) ;
//     printf (" Value pointed by ’p ’: %d\n", * p ); // De - reference p
//     *p = 500;
//     printf ("\nPrint out after *p =500.\n") ;
//     printf (" Value of ’a ’: %d\n", a ) ;
//     printf (" Value pointed by ’p’: %d\n", *p);
//     a = 98;
//     printf ("\nPrint out after a = 98.\n") ;
//     printf (" Value of ’a ’: %d\n", a ) ;
//     printf (" Value pointed by ’p ’: %d\n", *p);
// }

// #include <stdio.h>
// int main () {
//     int a, b, *p1, *p2;
//     printf ("The initial values :\n");
//     printf ("a=%d\n", a ) ;
//     printf ("b=%d\n", b ) ;
//     printf ("The address of a is: %p\n", & a ) ;
//     printf ("The address of b is: %p\n", & b ) ;
//     printf ("The address p1 is: %p\n", p1 ) ;
//     printf ("The address p2 is: %p\n", p2 ) ;
//     printf ("\n") ;
//     p1 = &a;
//     p2 = p1 ;
//     printf (" Result after p1 = &a and p2 = p1 :\n") ;
//     printf (" Value of *p1: %d\n", *p1 );
//     printf (" Value of *p2: %d\n", * p2 );
//     printf (" Value of a: %d\n", a ) ;
//     printf ("The address p1 is: %p\n", p1 ) ;
//     printf ("The address p2 is: %p\n", p2 ) ;
//     printf ("\n") ;
//     *p1 = 1;
//     printf (" Step 1, after *p1 = 1:\n") ;
//     printf (" Value of *p1: %d\n", * p1 );
//     printf (" Value of *p2: %d\n", * p2 );
//     printf (" Value of a: %d\n", a ) ;
//     printf ("The address p1 is: %p\n", p1 ) ;
//     printf ("The address p2 is: %p\n", p2 ) ;
//     printf ("\n") ;
//     *p2 = 2;
//     printf (" Step 2, after *p2 = 2;\n") ;
//     printf (" Value of *p1: %d\n", *p1 ); // Output : 2
//     printf (" Value of *p2: %d\n", *p2 ); // Output : 2
//     printf (" Value of a: %d\n", a ) ; // Output : 2
//     printf ("The address p1 is: %p\n", p1 ) ;
//     printf ("The address p2 is: %p\n", p2 ) ;
// }
// #include <stdio.h>
// int main ()
// {
//     int x = 10 , y = 20 , *p1 , * p2 ;
//     p1 = &x;
//     p2 = &y;
//     printf ("The initial values :\n");
//     printf ("x=%d\n", x ) ;
//     printf ("y=%d\n", y ) ;
//     printf ("The address of x is: %p\n", &x) ;
//     printf ("The address of y is: %p\n", &y) ;
//     printf ("The address p1 is: %p\n", p1 ) ;
//     printf ("The address p2 is: %p\n", p2 ) ;
//     printf ("\n") ;
//     *p1 = *p2 ;
//     printf (" After *p1 = *p2 :\n") ;
//     printf ("x=%d\n", x ) ;
//     printf ("y=%d\n", y ) ;
//     printf (" Value at address pointed by p1: %d\n", * p1 ) ;
//     printf (" Value at address pointed by p2: %d\n", * p2 ) ;
//     printf ("The address of x is: %p\n", & x ) ;
//     printf ("The address of y is: %p\n", & y ) ;
//     printf ("The address p1: %p\n", p1 ) ;
//     printf ("The address p2: %p\n", p2 ) ;
// }
// # include <stdio.h>
// int main () {
// int arr [] = {10 , 20 , 30 , 40 , 50}; // Initializing an array with values
// // Printing the address and value of each element in the array
// for ( int i = 0; i < 5; i ++) {
// printf ("arr [%d] = %d with address %p\n", i , arr [ i ] , & arr [ i ]) ;
// }
// }
// #include <stdio.h>
// // Function to find the end of a string using a pointer
// void findEndOfString ( const char * str ) {
// while (* str != '\0') {
// str ++; // Move the pointer to the next character
// }
// // Print the last character of the string
// printf ("End of string : %c\n", *( str - 1) ) ;
// }
// int main () {
// // Single string
// const char myString [] = "Hello , this is a test string. K";
// // Send the string as a pointer to the function to find the end
// findEndOfString ( myString ) ;
// }
#include <stdio.h>
#include <string.h>
// Function to find the end of a string using a pointer with afor loop
int EOS(const char *str) {
    int n;
    for (n = 0; *str != '\0'; str++) {
        n++;
    }
    return n;
}
int main() {
    const char *myString = "Hello, this is a test string.";
    int lastCharacter = EOS(myString);
    char lastc = EOS(myString);
    printf("Length of String: %d\n", lastCharacter);
    printf("Last Char of string: %c\n", *(myString + lastCharacter - 1));
}