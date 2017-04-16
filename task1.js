
console.log("------Task 1---------");
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
function getCurrentDate2() {
    var now = new Date(); 
    return now.toString();
}
var current_date2 = getCurrentDate2();
console.log(current_date2);
console.log("---------------------");

console.log("------Task 3---------");
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
var now = new Date();
var newYearDate = new Date(now.getFullYear()+1,0,1);
var daysLeftUntilNewYear = (newYearDate - now)/(1000*60*60*24);
console.log("Days left until New Year: "+ Math.round(daysLeftUntilNewYear));
console.log("---------------------");

console.log("------Task 5---------");
function is_array(arr) {
    return Array.isArray(arr);
}
console.log(typeof([1,2,3,4,5]));
console.log(typeof({name: "Jhon", surname: "Doe"}));
console.log(is_array("qwe")); 
console.log(is_array([1, 2, 4, 0]));

console.log("---------------------");

console.log("------Task 6---------");
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
function mostFrequentInArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length(); i++) {
            arr[i]
        }
    }
    else return "Error. It's not an array"
        
}
console.log("---------------------");

/*console.log("------Task 8---------");
console.log("---------------------");

console.log("------Task 9---------");
console.log("---------------------");

console.log("------Task 10--------");
console.log("---------------------");

console.log("------Task 11--------");
console.log("---------------------");

console.log("------Task 12--------");
console.log("---------------------");

console.log("------Task 13--------");
console.log("---------------------");

console.log("------Task 14--------");
console.log("---------------------");

console.log("------Task 15--------");
console.log("---------------------");

console.log("------Task 16--------");
console.log("---------------------");

console.log("------Task 17--------");
console.log("---------------------");

console.log("------Task 18--------");
console.log("---------------------");

console.log("------Task 19--------");
console.log("---------------------");

console.log("------Task 20--------");
console.log("---------------------");

console.log("------Task 21--------");
console.log("---------------------");

console.log("------Task 22--------");
console.log("---------------------");

console.log("------Task 23--------");
console.log("---------------------");

console.log("------Task 24--------");
console.log("---------------------");

console.log("------Task 25--------");
console.log("---------------------");

console.log("------Task 26--------");
console.log("---------------------");

console.log("------Task 27--------");
console.log("---------------------");*/
