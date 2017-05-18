function Chocolate(name) {
    var cacao = new Cacao('Bobs', 30);
    var milk = new Milk('Cow', 20);
    var sugar = new Sugar('white', 20);
    Complex.call(this, name, [cacao, milk, sugar]);
}

Chocolate.prototype = Object.create(Complex.prototype); 