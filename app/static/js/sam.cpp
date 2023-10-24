#include <iostream>

#define _USE_MATH_DEFINES
#include <math.h>         // Use the M_PI constant for pi
                          // Use the sqrt(double) function for the square root.

using namespace std;

int main()
{
    char choice = 'y'; //creating a char for the y character
    int asciiCode; // the integer of the ascii code

    cout << "This program will output the ASCII character" << endl;
    do{
        cout << "Enter a number between 32 and 126:";
        cin >> asciiCode; // taking in user's integer

        if (asciiCode <= 32 || asciiCode >= 126) { // integer must be between 32 and 126
            cout << "That number is out of range." << endl;
            continue; // skip the rest of the loop and start from the beginning
        }
        cout << "The ASCII character for " << asciiCode << " is '" << static_cast<char>(asciiCode) << "'." << endl;

        cout << "Would you like to enter another ASCII code? (Enter Y for Yes):"; // asking for decision
        cin >> choice; // taking in decision

    } while (goAgain == "Y" || goAgain == "y");

    return 0;
}
#endif // CATCH_CONFIG_MAIN Please do not remove.

void getShapeInfo(string &shape, double &parameter1, double &parameter2, double &parameter3) {

    cout << "Please enter the shape you would like to use." << endl;
    cout << "S for Square, R for Rectangle, C for Circle or T for Triangle:";
    cin >> shape;


    if (shape == "S") {
        shape = "Square";
        cout << "Please enter the length of square side:";
        cin >> parameter1;
    } else if (shape == "R") {
        cout << "Please enter the height and width of the Rectangle separated by a space:";
        cin >> parameter1 >> parameter2;
    } else if (shape == "C") {
        cout << "Please enter the circle radius:";
        cin >> parameter1;
    } else if (shape == "T") {
        cout << "Please enter the 3 side lengths separated by spaces:";
        cin >> parameter1 >> parameter2 >> parameter3;
    }
}

double calculateRectanglePerimeter(double width, double height) {
    double perimeter;
    perimeter = width + width + height + height;
    return perimeter;
}
double calculateRectangleArea(double width, double height) {
    double area;
    area = width * height;
    return area;
}

double calculateCirclePerimeter(double radius) {
    double perimeter;
    perimeter = 2 * M_PI * radius;
    return perimeter;
}
double calculateCircleArea(double radius) {
    double area;
    area = M_PI * radius * pow(radius,2);
    return area;
}

void displayResult(string shape, double perimeter, double area) {
    cout << "You entered the shape " << shape;
}
