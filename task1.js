
console.log("------Task 1---------");
/*1.	Write a JavaScript program to display the current day and time in the following format. 
Sample Output: Today is: Friday.
*/
function getCurrentDate() {
    var now = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; 
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var current_date = {};
    current_date.year = now.getFullYear();
    current_date.month = months[now.getMonth()];
    current_date.date = now.getDate();
    current_date.day = days[now.getDay()];
    current_date.hours = now.getHours();
    current_date.minutes = now.getMinutes();
    if (current_date.minutes < 10) 
        current_date.minutes = "0" + current_date.minutes;   
    return current_date;
}
var current_date = getCurrentDate();
console.log("Today is: "+current_date.day + " " +current_date.date +" "+ current_date.month + " " +current_date.year);
console.log("Time is: "+current_date.hours+":"+current_date.minutes);
console.log("---------------------");

console.log("------Task 2---------");
/*2.	Write a JavaScript program to get the current date. */
function getCurrentDate2() {
    var now = new Date(); 
    return now.toString();
}
var current_date2 = getCurrentDate2();
console.log(current_date2);
console.log("---------------------");

console.log("------Task 3---------");
//3.	Write a JavaScript program to find 1st January be a Sunday between 2014 and 2050. 
function firstJanuaryIsSunday(dateStart, dateEnd){
    for(var year = dateStart; year < dateEnd; year++) {
       var date = new Date(year, 0, 1);
        if (date.getDay() === 0) {
            console.log("In "+year+" 1st January be a Sunday");
        }
    }
}
firstJanuaryIsSunday(2014,2050);
console.log("---------------------");

console.log("------Task 4---------");
//4.	Write a JavaScript program to calculate days left until next New Year.
var now = new Date();
var newYearDate = new Date(now.getFullYear()+1,0,1);
var daysLeftUntilNewYear = (newYearDate - now)/(1000*60*60*24);
console.log("Days left until New Year: "+ Math.round(daysLeftUntilNewYear));
console.log("---------------------");

console.log("------Task 5---------");
//5.	Write a JavaScript function to check whether an `input` is an array or not. 
function is_array(arr) {
    return Array.isArray(arr);
}
console.log(typeof([1,2,3,4,5]));
console.log(typeof({name: "Jhon", surname: "Doe"}));
console.log(is_array("qwe")); 
console.log(is_array([1, 2, 4, 0]));

console.log("---------------------");

console.log("------Task 6---------");
//6.	Write a JavaScript function to clone an array
function cloneArray(arr) {
    return arr = arr.slice();
}
var arr = [1,2,3,4,5,6];
var newArr = cloneArray(arr);
arr[0] = 10;
console.log(arr);
console.log(newArr);
console.log("---------------------");

console.log("------Task 7---------");
//7.	Write a JavaScript function to find the most frequent item of an array.

function mostFrequentInArray(arr) {
    if (Array.isArray(arr)) {
        var newArr = arr;
        var arrFrequency = [];
        var maxFrequency = 1, indexOfFrequent;
        for (var i = 0; i < arr.length; i++) {
            arrFrequency[i] = 1;
            for (var j = i+1; j < newArr.length; j++) {
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
    }
    else return "Error. It's not an array"
        
}
var arr = [1,4,4,9,9,1,3,5,7,0,7,5,7,9,9];
console.log("Most frequent in array ["+arr+"] is: "+mostFrequentInArray(arr));
console.log("---------------------");

console.log("------Task 8---------");
//8.	Write a JavaScript function that inverts the case of the letters of the given string and returns new string

function invertCase(str) {
    var invertCaseStr = '';
    for (var i = 0; i < str.length; i++) {
        var s = str.charAt(i);
        invertCaseStr += (s === s.toLowerCase() ? s.toUpperCase() : s.toLowerCase());
    }
    return invertCaseStr;
}
var str = "JavaScript ForEver";
console.log("Invert case: "+invertCase(str));
console.log("---------------------");

console.log("------Task 9---------");
//9.	Write a JavaScript program to remove duplicate strings from a string array (ignore case sensitivity)

console.log("---------------------");

console.log("------Task 10--------");
//10.	Write a JavaScript program to shuffle an array

console.log("---------------------");

/*console.log("------Task 11--------");
//11.	Write a JavaScript function to remove. 'null', '0', '""', 'false', 'undefined' and 'NaN' values from an array

console.log("---------------------");

console.log("------Task 12--------");
//12.	Write a JavaScript function to sort the following array of objects by title value using ‘sort’ method

console.log("---------------------");

console.log("------Task 13--------");
//13.	Write a JavaScript function to merge two arrays and removes all duplicates elements

console.log("---------------------");

console.log("------Task 14--------");
//14.	Write a JavaScript function to remove a specific element from an array

console.log("---------------------");

console.log("------Task 15--------");
//15.	Write a JavaScript function to get a random item from an array

console.log("---------------------");

console.log("------Task 16--------");
//16.	Write a JavaScript function to move an array element from one position to another

console.log("---------------------");

console.log("------Task 17--------");
//17.	Write a JavaScript function to get difference between two dates in days


console.log("---------------------");

console.log("------Task 18--------");
//18.	Write a JavaScript function to get the maximum date from an array of dates

console.log("---------------------");

console.log("------Task 19--------");
//19.	Write a JavaScript function to split a string and convert it into an array of words

console.log("---------------------");

console.log("------Task 20--------");
//20.	Write a JavaScript function to capitalize the first letter of a string

console.log("---------------------");

console.log("------Task 21--------");
//21.	Write a JavaScript function to convert a string into camel case


console.log("---------------------");

console.log("------Task 22--------");
//22.	Write a JavaScript function to find the highest value in an array


console.log("---------------------");

console.log("------Task 23--------");
//23.	Write a JavaScript function to find the lowest value in an array


console.log("---------------------");

console.log("------Task 24--------");
//24.	Write a JavaScript function to check to check whether a variable is numeric or not


console.log("---------------------");

console.log("------Task 25--------");
//25.	Write a JavaScript function to calculate the sum of values in an array


console.log("---------------------");

console.log("------Task 26--------");
//26.	Write a JavaScript program to get the length of a JavaScript object

console.log("---------------------");

console.log("------Task 27--------");
//27.	Write a JavaScript program to list the properties of a JavaScript object

console.log("---------------------");*/
