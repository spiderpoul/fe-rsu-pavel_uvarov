function ChupaChups(name) {
    var apple = new Apple('Green', 10);
    var caramel = new Caramel('Caramel', 20);
    var sugar = new Sugar('White', 30);

    Complex.call(this, name, [
        apple,
        caramel,
        sugar
    ]);
}

ChupaChups.prototype = Object.create(Complex.prototype);