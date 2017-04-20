
// Declare two variables and show them
console.log("Declare two variables and show them");
const a = 5;
const b = 7;
console.log(a + " " + b);


// Write a function that can find triangle's area
console.log("Write a function that can find triangle's area");
const functionTriangleArea = function triangleArea(a, b, c) {
    var p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}
const c = 10;
console.log("Triangle area with " + "a=" + a + ", " + "b=" + b + ", " + "c=" + c + ", area=" + functionTriangleArea(a, b, c));


// Write a function that reverse the given array using three kind of loops
console.log("Write a function that reverse the given array using three kind of loops");
const d = [1, 2, 3, 4, 5, 6];

const functionReverseArrFor = function ReverseArrFor(arr) {
    var i;
    var temp;
    for (i = 0; i < arr.length / 2; i++) {
        temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
    return arr;
}

const functionReverseArrWhile = function ReverseArrWhile(arr) {
    var i = 0;
    var temp;
    while (i < arr.length / 2) {
        temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
        i++;
    }
    return arr;
}

const functionReverseArrDowhile = function ReverseArrDowhile(arr) {
    var i = 0;
    var temp;
    do {
        temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
        i++;
    } while (i < arr.length / 2);
    return arr;
}

console.log("Inintial array " + d);
console.log("Reversed array with for loop " + functionReverseArrFor(d));
console.log("Inintial array " + d);
console.log("Reversed array with while loop " + functionReverseArrWhile(d));
console.log("Inintial array " + d);
console.log("Reversed array with dowhile loop " + functionReverseArrDowhile(d));


//Differnce between ++i i++
console.log("Differnce between ++i i++ is that first one first of all increase value and then return increased value i, and second one firstly return value i and only then increase");
var i = 0,
    j;
j = i++;
console.log("j = i++" + " | j = " + j + " i = " + i);
j = ++i;
console.log("j = ++i" + " | j = " + j + " i = " + i);
console.log("------------");

//Function that checks if the given arguments is positive number or negative number or is 0
const functionCheckNumber = function checkNumber(arg) {
    if (typeof(arg) === "number") {
        if (arg === 0) {
            return "0";
        } else {
            if (arg > 0) {
                return "positive number";
            } else {
                return "negative number";
            }
        }
    } else {
        return "NaN";
    }
}

console.log("0 is", functionCheckNumber(0));
console.log("1 is", functionCheckNumber(1));
console.log("-1 is", functionCheckNumber(-1));
console.log("'a' is", functionCheckNumber("a"));
console.log("------------");

// Asking the user his name and alert it back
/*const user_name = prompt("Hello! What is your name?");
console.log("Nice to meet you, " + user_name);*/
console.log("------------");

// Calculation fatorial
function factorial(n) {
    var f = 1;
    var i;
    for (i = 2; i <= n; i++) {
        f *= i;
    }
    return f;
}

var f = 5;
console.log("Factorial of " + f + " = " + factorial(f));
/* */
var obj = {"key1":"value1"};
function myFunction(x) {
    console.log(x); // undefined
}
myFunction(...obj);
var args = [...obj];
console.log(args, args.length)