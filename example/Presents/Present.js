function Present(name, ingredients) {
    Complex.call(this, name, ingredients);
}

Present.prototype = Object.create(Complex.prototype);

