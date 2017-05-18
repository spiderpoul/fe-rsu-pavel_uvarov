function Cookie(name) {
    var eggs = new Egg('Egg', 10);
    var flour = new Flour('Flour', 20);
    var sugar = new Sugar('White', 30);

    Complex.call(this, name, [
        eggs,
        flour,
        sugar
    ]);
}

Cookie.prototype = Object.create(Complex.prototype);