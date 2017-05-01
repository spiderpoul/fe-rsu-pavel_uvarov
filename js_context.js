// Calculator using prototype
function Calculator(initialValue) {
    this.result = initialValue;
}

Calculator.prototype.getResult = function() {
    return this.result;
};

Calculator.prototype.add = function(value) {
    this.result += value;
    return this;
};

Calculator.prototype.subtract = function(value) {
    this.result -= value;
    return this;
};

Calculator.prototype.divide = function(value) {
    this.result /= value;
    return this;
};

Calculator.prototype.multiply = function(value) {
    this.result *= value;
    return this;
};

Calculator.prototype.reset = function() {
    this.result = 0;
    return this;
};

/**
 * Method for calculator which emulates request to a server and sets the state of Calculator 
 * when we get a response
 */
Calculator.prototype.getInitialState = function(callback) {
    setTimeout(function() {
        callback();
    }, 500);
    return this;
};

let calc = new Calculator(0);
console.log(calc.getResult());

calc.add(4);
calc.subtract(1);
console.log(calc.getResult());

calc.reset();

console.log(calc.add(4).reset().add(1).getResult());

calc.getInitialState(function() {
    calc.reset().add(1).multiply(6).divide(2);
    console.log(calc.getResult());
});


// Bind method
function bind(func, context) {
    return function() {
        return func.apply(context, arguments);
    };
}

const user = {
    name: "user"
};

const funcGetName = function getName() {
    console.log(this.name);
};

bind(funcGetName, user)();