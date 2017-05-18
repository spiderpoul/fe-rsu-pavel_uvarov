function Snickers(name) {
    var chocolate = new Chocolate('Milk');
    var nuts = new Nut('Nut', 10);
    var nougat = new Nougat('nougat');
    var sugar = new Sugar('sugar', 10);
    var caramel = sugar.heat();

    Complex.call(this, name, [
        chocolate,
        nuts,
        caramel,
        nougat
    ]);
}

Snickers.prototype = Object.create(Complex.prototype);  