
// Declare two variables and show them
console.log("1. Declare two variables and show them");
var variableOne = 5;
var variableTwo = 7;
console.log(variableOne + " " + variableTwo);


// Write a function that can find triangle's area
console.log("2. Write a function that can find triangle's area");
const functionTriangleArea = function findTriangleArea (a, b, c) {
    const halfPerimetr = (a + b + c) / 2;    
    return Math.sqrt(halfPerimetr * (halfPerimetr - a) * (halfPerimetr - b) * (halfPerimetr - c));;
}
const triangeleSideA = 5;
const triangeleSideB = 7;
const triangeleSideC = 10;
console.log("Triangle area with sides" + "a=" + triangeleSideA + ", " + "b=" + triangeleSideB + ", " + "c=" + triangeleSideC + ", area=" + functionTriangleArea(triangeleSideA, triangeleSideB, triangeleSideC));


// Write a function that reverse the given array using three kind of loops
console.log("3. Write a function that reverse the given array using three kind of loops");
const someArr = [1, 2, 3, 4, 5, 6];

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

console.log("Inintial array [" + someArr + "]");
console.log("Reversed array with \"for\" loop [" + functionReverseArrFor(someArr) + "]");
console.log("Inintial array [" + someArr + "]");
console.log("Reversed array with \"while\" loop [" + functionReverseArrWhile(someArr) + "]");
console.log("Inintial array [" + someArr + "]");
console.log("Reversed array with \"dowhile\" loop [" + functionReverseArrDowhile(someArr) + "]");


//Differnce between ++i i++
console.log("4. Differnce between ++i i++ is that first one first of all increase value and then return increased value i, and second one firstly return value i and only then increase");
var i = 0;
var j = 0;
j = i++;
console.log("j = i++" + " where j = " + j + ", i = " + i);
j = ++i;
console.log("j = ++i" + " where j = " + j + ", i = " + i);


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


// Asking the user his name and alert it back
console.log("5. Asking the user his name and alert it back");
let user_name = prompt("Hello! What is your name?");
console.log("Nice to meet you, " + user_name);

// Calculation fatorial
console.log("6. Calculation fatorial");
const functionFactorial = function factorial(n) {
    var f = 1;
    var i;
    for (i = 2; i <= n; i++) {
        f *= i;
    }
    return f;
}
const calcFactorial = 5;
console.log("Factorial of " + calcFactorial + " is" + functionFactorial(calcFactorial));
