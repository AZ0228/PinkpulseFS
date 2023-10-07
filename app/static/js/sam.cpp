#include <iostream>
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

    }
    while (choice == 'Y' || choice == 'y'); // both capital and lowercase y accepted

    return 0;
}
//write your code for part 3 here