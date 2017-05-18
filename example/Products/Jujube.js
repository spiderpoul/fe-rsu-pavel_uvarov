function Jujube(name) {
    var gelatin = new Gelatin('Gelatin', 10);
    var sugar = new Sugar('White', 30);

    Complex.call(this, name, [
        gelatin,
        sugar
    ]);
}

Jujube.prototype = Object.create(Complex.prototype);