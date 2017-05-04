// Recursive output of array's elements
function consoleRec(arr) {

    function getElement(i) {
        if (i < arr.length) {
            console.log(arr[i]);
            return getElement(i + 1);
        } else
            return i;
    }

    getElement(0);
}

consoleRec(['я', 'умею', 'писать', 'рекурсивные', 'функции']);