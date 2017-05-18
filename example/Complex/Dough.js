function Dough(name) {
    var flour = new Flour('Wheat', 30);
    var eggs = new Egg('Chicken', 10);
    var milk = new Milk('Cow', 10);
    Complex.call(this, name, [flour, eggs, milk]);
}

Dough.prototype = Object.create(Complex.prototype); 