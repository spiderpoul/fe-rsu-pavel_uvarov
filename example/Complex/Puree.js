function Puree(name) {
    var apple = new Apple('Green', 30);
    var sugar = new Sugar('Cow', 10);
    Complex.call(this, name, [apple, sugar]);
}

Puree.prototype = Object.create(Complex.prototype);  