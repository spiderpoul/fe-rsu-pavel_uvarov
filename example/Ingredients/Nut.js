function Nut(name, weight) {
    Food.call(this, name, weight);
}

Nut.prototype = Object.create(Food.prototype);