function Zephyr(name) {
    var apple = new Apple('Apple', 10);
    var egg = new Egg('Egg', 10);
    var gelatin = new Gelatin('Gelatin', 10);
    var sugar = new Sugar('White', 30);

    Complex.call(this, name, [
        apple,
        egg,
        gelatin,
        sugar
    ]);
}

Zephyr.prototype = Object.create(Complex.prototype);