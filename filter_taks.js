// Filter array using filter function
function isAllTrue(source, filterFn) {    
    let i = 0;
    for(i; i < source.length; i += 1) {
       if (!filterFn(source[i])) {
           return false;
       }    
    }; 
    return true;
}

const allNumbers = [1, 2, 4, 5, 6, 7, 8];
const someNumbers = [1, 2, 'привет', 4, 5, 'ololo', 6, 7, 8];
const noNumbers = ['это', 'массив', 'без', 'чисел'];


function isNumber(val) {
    return typeof val === 'number';
}


console.log(isAllTrue(allNumbers, isNumber));
console.log(isAllTrue(someNumbers, isNumber));
console.log(isAllTrue(noNumbers, isNumber));