function Gingerbread(name) {
    var eggs = new Egg('Egg', 10);
    var flour = new Flour('Flour', 20);
    var honey = new Honey('White', 30);
    var sugar = new Sugar('White', 30);

    Complex.call(this, name, [
        eggs,
        flour,
        honey,
        sugar
    ]);
}

Gingerbread.prototype = Object.create(Complex.prototype);