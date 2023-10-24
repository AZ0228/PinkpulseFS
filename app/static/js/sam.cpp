#include <iostream>

#define _USE_MATH_DEFINES
#include <math.h>         // Use the M_PI constant for pi
                          // Use the sqrt(double) function for the square root.

using namespace std;

//prototypes given already
void getShapeInfo(string &shape, double &parameter1, double &parameter2, double &parameter3);

double calculateRectanglePerimeter(double width, double height);
double calculateRectangleArea(double width, double height);

double calculateCirclePerimeter(double radius);
double calculateCircleArea(double radius);

double calculateTrianglePerimeter(double side1, double side2, double side3);
double calculateTriangleArea(double side1, double side2, double side3);

void displayResult(string shape, double perimeter, double area);


// This line is used by the autograder.  Please do not remove.
#ifndef CATCH_CONFIG_MAIN
int main() {
    cout << "This program will give you the perimeter and area of a shape." << endl;

    string goAgain = "Y";

    do {
        string shape;
        double parameter1, parameter2, parameter3;
        getShapeInfo(shape, parameter1, parameter2, parameter3);

        double perimeter, area;

        if (shape == "S"){
            calculateRectanglePerimeter(parameter1, parameter2);
            calculateRectangleArea(parameter1, parameter2);
        }
        else if (shape == "R"){
            calculateRectanglePerimeter(parameter1, parameter2);
            calculateRectangleArea(parameter1, parameter2);
        }
        else if (shape == "C"){
            calculateCirclePerimeter(parameter1);
            calculateCircleArea( parameter1);
        }
        else if (shape == "T"){
            calculateTrianglePerimeter(parameter1, parameter2, parameter3);
            calculateTriangleArea(parameter1, parameter2, parameter3);
        }

        displayResult(shape, perimeter, area);



        cout << "Would you like to enter another Shape? (Y/y for yes): ";
        cin >> goAgain;

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