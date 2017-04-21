/**
 * 1.	Write a JavaScript program to display the current day and time in the following format. 
 * Sample Output: Today is: Friday.
 */
console.log("1.	Write a JavaScript program to display the current day and time");
const funcGetCurrentDateFormat = function getCurrentDateFormat() {
    const nowDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = {};
    currentDate.year = nowDate.getFullYear();
    currentDate.month = months[nowDate.getMonth()];
    currentDate.date = nowDate.getDate();
    currentDate.day = days[nowDate.getDay()];
    currentDate.hours = nowDate.getHours();
    currentDate.minutes = nowDate.getMinutes();
    if (currentDate.minutes < 10)
        currentDate.minutes = "0" + currentDate.minutes;
    return currentDate;
};
let currentDateFormat = funcGetCurrentDateFormat();
console.log("Today is: " + currentDate.day + " " + currentDate.date + " " + currentDate.month + " " + currentDate.year);
console.log("Time is: " + currentDate.hours + ":" + currentDate.minutes);


// 2.	Write a JavaScript program to get the current date.
console.log("2.	Write a JavaScript program to get the current date.");
const funcGetCurrentDate = function getCurrentDate() {
    const now = new Date();
    return now.toString();
};
let currentDate = funcGetCurrentDate();
console.log(currentDate);


// 3.	Write a JavaScript program to find 1st January be a Sunday between 2014 and 2050. 
console.log("3.	Write a JavaScript program to find 1st January be a Sunday between 2014 and 2050.");
const funcFirstJanuaryIsSunday = function firstJanuaryIsSunday(dateStart, dateEnd) {
    let year;
    for (year = dateStart; year < dateEnd; year += 1) {
        const date = new Date(year, 0, 1);
        if (date.getDay() === 0) {
            console.log("In " + year + " 1st January be a Sunday");
        }
    }
};
funcFirstJanuaryIsSunday(2014, 2050);


// 4.	Write a JavaScript program to calculate days left until next New Year.
console.log("4.	Write a JavaScript program to calculate days left until next New Year.");
const now = new Date();
const newYearDate = new Date(now.getFullYear() + 1, 0, 1);
const daysLeftUntilNewYear = (newYearDate - now) / (1000 * 60 * 60 * 24);
console.log("Days left until New Year: " + Math.round(daysLeftUntilNewYear));


// 5.	Write a JavaScript function to check whether an `input` is an array or not. 
console.log("5.	Write a JavaScript function to check whether an `input` is an array or not. ");
const funcIsArray = function isArray(arr) {
    return Array.isArray(arr);
};
console.log(funcIsArray("qwe"));
console.log(funcIsArray([1, 2, 4, 0]));



// 6.	Write a JavaScript function to clone an array
console.log("6.	Write a JavaScript function to clone an array");
const funcCloneArray = function cloneArray(arr) {
    return arr = arr.slice();
};
const arr = [1, 2, 3, 4, 5, 6];
const newArr = funcCloneArray(arr);
arr[0] = 10;
console.log(arr);
console.log(newArr);


// 7.	Write a JavaScript function to find the most frequent item of an array.
console.log("7.	Write a JavaScript function to find the most frequent item of an array.");
const funcMostFrequentInArray = function mostFrequentInArray(arr) {
    if (Array.isArray(arr)) {
        const arrFrequency = [];
        let newArr = arr;        
        let maxFrequency = 1;
        let indexOfFrequent;
        let i;
        let j;
        for (i = 0; i < arr.length; i += 1) {
            arrFrequency[i] = 1;
            for (j = i + 1; j < newArr.length; j += 1) {
                if (arr[i] === newArr[j]) {
                    arrFrequency[i]++;
                }
            }
            if (arrFrequency[i] > maxFrequency) {
                maxFrequency = arrFrequency[i];
                indexOfFrequent = i
            }
        }
        return arr[indexOfFrequent];
    } else return "Error. It's not an array"

};
var arr = [1, 4, 4, 9, 9, 1, 3, 5, 7, 0, 7, 5, 7, 9, 9];
console.log("Most frequent in array [" + arr + "] is: " + funcMostFrequentInArray(arr));


// 8.	Write a JavaScript function that inverts the case of the letters of the given string and returns new string
console.log("8.	Write a JavaScript function that inverts the case of the letters of the given string and returns new string");

const funcInvertCase = function invertCase(str) {
    let invertCaseStr = '';
    let i;
    for (i = 0; i < str.length; i += 1) {
        let s = str.charAt(i);
        invertCaseStr += (s === s.toLowerCase() ? s.toUpperCase() : s.toLowerCase());
    }
    return invertCaseStr;
};

const str = "JavaScript ForEver";
console.log("Invert case: " + funcInvertCase(str));

// 9.	Write a JavaScript program to remove duplicate strings from a string array (ignore case sensitivity)
console.log("9.	Write a JavaScript program to remove duplicate strings from a string array (ignore case sensitivity)");

const funcRemoveDuplicates = function removeDuplicates(arrString) {
    
}

// 10.	Write a JavaScript program to shuffle an array
console.log("10.	Write a JavaScript program to shuffle an array");


// 11.	Write a JavaScript function to remove. 'null', '0', '""', 'false', 'undefined' and 'NaN' values from an array
console.log("11.	Write a JavaScript function to remove. \'null\', \'0\', \'\"\"\', \'false\', \'undefined\' and \'NaN\' values from an array");


// 12.	Write a JavaScript function to sort the following array of objects by title value using ‘sort’ method
console.log("12.	Write a JavaScript function to sort the following array of objects by title value using ‘sort’ method");


// 13.	Write a JavaScript function to merge two arrays and removes all duplicates elements
console.log("13.	Write a JavaScript function to merge two arrays and removes all duplicates elements");


// 14.	Write a JavaScript function to remove a specific element from an array
console.log("14.	Write a JavaScript function to remove a specific element from an array");


// 15.	Write a JavaScript function to get a random item from an array
console.log("15.	Write a JavaScript function to get a random item from an array");


// 16.	Write a JavaScript function to move an array element from one position to another
console.log("16.	Write a JavaScript function to move an array element from one position to another");


// 17.	Write a JavaScript function to get difference between two dates in days
console.log("17.	Write a JavaScript function to get difference between two dates in days");


// 18.	Write a JavaScript function to get the maximum date from an array of dates
console.log("18.	Write a JavaScript function to get the maximum date from an array of dates");


// 19.	Write a JavaScript function to split a string and convert it into an array of words
console.log("19.	Write a JavaScript function to split a string and convert it into an array of words");


// 20.	Write a JavaScript function to capitalize the first letter of a string
console.log("20.	Write a JavaScript function to capitalize the first letter of a string");


// 21.	Write a JavaScript function to convert a string into camel case
console.log("21.	Write a JavaScript function to convert a string into camel case");



// 22.	Write a JavaScript function to find the highest value in an array
console.log("22.	Write a JavaScript function to find the highest value in an array");



// 23.	Write a JavaScript function to find the lowest value in an array
console.log("23.	Write a JavaScript function to find the lowest value in an array");



// 24.	Write a JavaScript function to check to check whether a variable is numeric or not
console.log("24.	Write a JavaScript function to check to check whether a variable is numeric or not");



// 25.	Write a JavaScript function to calculate the sum of values in an array
console.log("25.	Write a JavaScript function to calculate the sum of values in an array");



// 26.	Write a JavaScript program to get the length of a JavaScript object
console.log("26.	Write a JavaScript program to get the length of a JavaScript object");


// 27.	Write a JavaScript program to list the properties of a JavaScript object
console.log("27.	Write a JavaScript program to list the properties of a JavaScript object");