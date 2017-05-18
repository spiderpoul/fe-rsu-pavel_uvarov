function Honey(name, weight) {
    Food.call(this, name, weight);
}

Honey.prototype = Object.create(Food.prototype);