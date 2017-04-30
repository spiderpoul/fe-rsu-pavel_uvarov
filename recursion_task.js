// Recursive output of array's elements
function consoleRec(arr) {
    let i = 0;

    function getElement(i) {
        if (i < arr.length) {
            console.log(arr[i]);
            return getElement(i + 1);
        } else
            return i;
    }

    getElement(i);
}

consoleRec(['я', 'умею', 'писать', 'рекурсивные', 'функции']);