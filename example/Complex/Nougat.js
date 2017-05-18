function Nougat(name) {
    var nut = new Nut('Greece', 20);
    var honey = new Honey('Flower', 60);
    Complex.call(this, name, [nut, honey]);
}

Nougat.prototype = Object.create(Complex.prototype); 