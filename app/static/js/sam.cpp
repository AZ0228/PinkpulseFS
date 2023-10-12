#include <iostream>
using namespace std;

double getKilometers();
double kilometersToMiles(double kilometers);
void printMiles(double kilometers, double miles);


// This line is used by the autograder.  Please do not remove.
#ifndef CATCH_CONFIG_MAIN
int main() {
    string goAgain = "Y";

    cout << "This program converts Kilometers to miles." << endl;

    do {

        double kilometers = getKilometers();
        double miles = kilometersToMiles(kilometers);
        printMiles(kilometers, miles);

        cout << "Would you like to enter another distance? (Y/y for yes): ";
        cin >> goAgain;

    } while (goAgain == "Y" || goAgain == "y");

    return 0;
}
#endif // CATCH_CONFIG_MAIN Please do not remove.



double getKilometers() {
    double distance;
    cout << "Please enter a distance in Kilometers:";
    cin >> distance;

    return distance;
}

double kilometersToMiles(double kilometers) {
    return 0;
}

void printMiles(double kilometers, double miles){
    cout << kilometers << " Kilometers is equivalent to " << miles << " miles." << endl;
}
