function Milk(name, weight) {
    Food.call(this, name, weight);
}

Milk.prototype = Object.create(Food.prototype);