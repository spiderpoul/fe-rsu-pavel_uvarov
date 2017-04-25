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
console.log("Today is: " + currentDateFormat.day + " " + currentDateFormat.date + " " + currentDateFormat.month + " " + currentDateFormat.year);
console.log("Time is: " + currentDateFormat.hours + ":" + currentDateFormat.minutes);


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
        let maxFrequency = 1;
        let indexOfFrequent;
        let i;
        let j;
        for (i = 0; i < arr.length; i += 1) {
            arrFrequency[i] = 1;
            for (j = i + 1; j < arr.length; j += 1) {
                if (arr[i] === arr[j]) {
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
const arrFreq = [1, 4, 4, 9, 9, 1, 3, 5, 7, 0, 7, 5, 7, 9, 9];
console.log("Most frequent in array [" + arrFreq + "] is: " + funcMostFrequentInArray(arrFreq));


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
    let i;
    for (i = 0; i < arrString.length; i += 1) {
        let j;
        for (j = i + 1; j < arrString.length; j += 1) {                    
            if (arrString[i].toLowerCase() === arrString[j].toLowerCase()) {
                arrString.splice(i,1);
                j -= 1;
            };
        };
    };
    return arrString;
}

const arrString = ["one", "One", "ONE", "TWO", "Two", "two", "THREE"];
console.log("Initial array [" + arrString + "]");
console.log("Remove duplicates [" + funcRemoveDuplicates(arrString) + "]");

// 10.	Write a JavaScript program to shuffle an array
console.log("10.	Write a JavaScript program to shuffle an array");
const funcShuffleArray = function shuffleArray(arr) {
    let j;
    let temp;
    arr.forEach(function(item, i, arr) {
        j = Math.round(Math.random()*i);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    });
    return arr;
};
const arrShuffle = [1, 2, 3, 4, 5];
console.log("Initial array: [" + arrShuffle + "]");
console.log("Shuffled array: [" + funcShuffleArray(arrShuffle) + "]");

// 11.	Write a JavaScript function to remove. 'null', '0', '""', 'false', 'undefined' and 'NaN' values from an array
console.log("11.	Write a JavaScript function to remove. \'null\', \'0\', \'\"\"\', \'false\', \'undefined\' and \'NaN\' values from an array");

const fuctRemoveValues = function removeValues(arr) {
    const removedValues = [null, 0, "", false, undefined, NaN];
    let i;
    for(i = 0; i < arr.length; i += 1) {
        let j;             
        for(j = 0; j < removedValues.length; j += 1)            
            if (arr[i] == removedValues[j]) {
                arr.splice(i,1);            
                if (!i) {
                    i -= 1
                }
            } 
    };
    return arr;
};

const arrWithRemoveValues = [null, 1, null, 2, 0, "", 3, false, 4, undefined, 5, NaN];
console.log("Initial array: [" + arrWithRemoveValues + "]");
console.log("Filtered array: [" + fuctRemoveValues(arrWithRemoveValues) + "]");


// 12.	Write a JavaScript function to sort the following array of objects by title value using ‘sort’ method
console.log("12.	Write a JavaScript function to sort the following array of objects by title value using ‘sort’ method");

const funcCompareByTitle = function compareByTitle(a, b) {
    if (a.title < b.title) 
        return -1;
    if (a.title > b.title) 
        return 1;
    return 0;
}

var library = [ { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
                { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
                { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
              ];

library.sort(funcCompareByTitle);
console.log("After sort:");
library.forEach(function(item, i, arrayOfObject){
    console.log(item.title + ", id: " + item.author);
});


// 13.	Write a JavaScript function to merge two arrays and removes all duplicates elements
console.log("13.	Write a JavaScript function to merge two arrays and removes all duplicates elements");

const funcMergeArrays = function mergeArrays(arrOne, arrTwo) {
    arrTwo = arrTwo.filter(function (item) {
                    return arrOne.indexOf(item) < 0;
                  });
    const mergedArray = arrOne.concat(arrTwo);        
    return mergedArray;
    console.log(mergedArray);
}

const arrForMergeOne = [1, 2, 3, 4];
const arrForMergeTwo = [3, 4, 5, 6];
console.log(funcMergeArrays(arrForMergeOne, arrForMergeTwo));


// 14.	Write a JavaScript function to remove a specific element from an array
console.log("14.	Write a JavaScript function to remove a specific element from an array");
const funcRemoveElement = function removeElement(arr, itemRemove){
    arr.forEach(function(item, i, arr) {
        if (item === itemRemove) {
            arr.splice(i,1)
        }
    });
    return arr;
}
const arrRemoveElement = [1, 2, 3, 2, 4, 5, 6];
console.log(funcRemoveElement(arrRemoveElement, 2));


// 15.	Write a JavaScript function to get a random item from an array
console.log("15.	Write a JavaScript function to get a random item from an array");

const funcGetRandomItem = function getRandomItem(arr) {    
    const i = Math.round(Math.random()*(arr.length - 1));
    return arr[i]
};

const arrRandomItem = [1, 2, 3, 4, 5, 6];
console.log("Random item: " + funcGetRandomItem(arrRandomItem));


// 16.	Write a JavaScript function to move an array element from one position to another
console.log("16.	Write a JavaScript function to move an array element from one position to another");

const funcMoveItem = function moveItem(arr, currPosition, newPosition) {
    const item = arr[currPosition];
    arr.splice(currPosition, 1);
    arr.splice(newPosition, 0, item);
    return arr;
}

const arrMoveItem = [1, 2, 3, 4, 5, 6];
console.log(funcMoveItem(arrMoveItem, 0, 5));

// 17.	Write a JavaScript function to get difference between two dates in days
console.log("17.	Write a JavaScript function to get difference between two dates in days");

const funcGetDiffBetweenDates = function getDiffBetweenDates(dateOne, dateTwo) {    
    return Math.round(Math.abs((dateTwo - dateOne) / (1000 * 3600 * 24)));    
}

const dateOne = new Date(2018, 0 , 1);
const dateTwo = new Date();
console.log("Difference between two dates in days: " + funcGetDiffBetweenDates(dateOne , dateTwo));

// 18.	Write a JavaScript function to get the maximum date from an array of dates
console.log("18.	Write a JavaScript function to get the maximum date from an array of dates");

function maxDate(arr) {
    const arrDates = [];
    let max = 0;
    let positionOfMax;
    arr.forEach(function(item, i, arr) {
        arrDates.push(new Date(item));
        if (max < arrDates[i]) {
            max = arrDates[i];
            positionOfMax = i;
        }
    });
    return arr[positionOfMax];
}
console.log(maxDate(['2015/02/01', '2015/02/02', '2015/01/03']));

// 19.	Write a JavaScript function to split a string and convert it into an array of words
console.log("19.	Write a JavaScript function to split a string and convert it into an array of words");

function getArrayOfWords(str) {
    str = str.split(" ");
    return str;
}

console.log(getArrayOfWords("Lorem ipsum ammet"));



// 20.	Write a JavaScript function to capitalize the first letter of a string
console.log("20.	Write a JavaScript function to capitalize the first letter of a string");

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
console.log(capitalizeFirstLetter("lorem ipsum ammet"));

// 21.	Write a JavaScript function to convert a string into camel case
console.log("21.	Write a JavaScript function to convert a string into camel case");

function camelize(str) {
    const arrOfWords = str.split();
    arrOfWords.forEach(function (item, i, arr) {
        item = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        //console.log(item);
    });
    return arrOfWords.join()
}

console.log(camelize("Java Script"));

console.log(camelize("java-script"));

console.log(camelize("Java Script Exercises"));

// 22.	Write a JavaScript function to find the highest value in an array
console.log("22.	Write a JavaScript function to find the highest value in an array");

const funcFindHighestValue = function findHighestValue(arr) {
    let max = arr[0];
    arr.forEach( function(item, i, arr) {
        if (max < item)            
            max = item
    });
    return max;
}
const arrFindHighestValue = [1, 2, 3, 4, 5, 6];
console.log("Highest value in an array: " + funcFindHighestValue(arrFindHighestValue));

// 23.	Write a JavaScript function to find the lowest value in an array
console.log("23.	Write a JavaScript function to find the lowest value in an array");

const funcFindLowestValue = function findLowestValue(arr) {
    let min = arr[0];
    arr.forEach( function(item, i, arr) {
        if (min > item)            
            max = item
    });
    return min;
}
const arrFindLowestValue = [1, 2, 3, 4, 5, 6];
console.log("Lowest value in an array: " + funcFindLowestValue(arrFindLowestValue));


// 24.	Write a JavaScript function to check to check whether a variable is numeric or not
console.log("24.	Write a JavaScript function to check to check whether a variable is numeric or not");

const funcIsNumeric = function isNumeric(variable) {
    return !isNaN(parseFloat(variable)) && isFinite(variable)
}
const valueIsNumeric = "15a";
console.log("isNumeric: " + valueIsNumeric + " - " + funcIsNumeric(valueIsNumeric));


// 25.	Write a JavaScript function to calculate the sum of values in an array
console.log("25.	Write a JavaScript function to calculate the sum of values in an array");

const funcCalcSumArr = function calcSumArr(arr) {
    let sum = 0;
    arr.forEach( function(item, i, arr){
        sum += item;                
    });
    return sum;
}
console.log(funcCalcSumArr([1, 2, 3, 4, 5, 6]));

// 26.	Write a JavaScript program to get the length of a JavaScript object
console.log("26.	Write a JavaScript program to get the length of a JavaScript object");

function getLengthOfObject(obj) {
    let objLength = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) 
            objLength += 1
    }
    return objLength;
}
const favoriteBook = {title: "Book",
                      id: "12",
                      author: "Author",
                      date: "date"
                     }
console.log(getLengthOfObject(favoriteBook));


// 27.	Write a JavaScript program to list the properties of a JavaScript object
console.log("27.	Write a JavaScript program to list the properties of a JavaScript object");

function getListPropertiesOfObject(obj) {
    const listProperties = [];
    for (key in obj) {
        listProperties.push(key);
    }
    return listProperties;
}
console.log(getListPropertiesOfObject(favoriteBook));