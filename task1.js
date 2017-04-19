
const a = 5;
const b = 7;
console.log(a + " " + b);
console.log("------------");

//Find triangle area
const functionTriangleArea = function triangleArea(a, b, c) {
    var p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}
var c = 10;
console.log("Triangle area with " + "a=" + a + ", " + "b=" + b + ", " + "c=" + c + ", area=" + functionTriangleArea(a, b, c));
console.log("------------");

//Reverse array
var d = [1, 2, 3, 4, 5, 6];

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
console.log("Reversed array with for loop " + reverse_arr_for(d));
console.log("Inintial array " + d);
console.log("Reversed array with while loop " + reverse_arr_while(d));
console.log("Inintial array " + d);
console.log("Reversed array with dowhile loop " + reverse_arr_dowhile(d));
console.log("------------");

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
function check_number(arg) {
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

console.log("0 is", check_number(0));
console.log("1 is", check_number(1));
console.log("-1 is", check_number(-1));
console.log("'a' is", check_number("a"));
console.log("------------");

// Asking the user his name and alert it back
/*var user_name = prompt("Hello! What is your name?");
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
const foo = [1, 2];
const bar = foo;

bar[1] = 9;

console.log(foo[1], bar[1]);