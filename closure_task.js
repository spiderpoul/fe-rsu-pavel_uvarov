// Calculator using closure
const Calculator = (function(initialValue) {
    let result = initialValue;

    function getResult() {
        return result;
    }

    function add(value) {
        result += value;
        return add;
    }

    function subtract(value) {
        result -= value;
        return subtract;
    }

    function divide(value) {
        result /= value;
        return divide;
    }

    function multiply(value) {
        result *= value;
        return multiply;
    }

    function reset() {
        result = 0;
    }

    return {
        getResult: getResult,
        add: add,
        subtract: subtract,
        divide: divide,
        multiply: multiply,
        reset: reset
    };
})(0);

console.log(Calculator.getResult());
Calculator.add(4);
Calculator.subtract(1);
Calculator.divide(3);
Calculator.multiply(5)(2);
console.log(Calculator.getResult());
console.log(Calculator.reset());
Calculator.add(4)(1)(5)(10);
console.log(Calculator.getResult());