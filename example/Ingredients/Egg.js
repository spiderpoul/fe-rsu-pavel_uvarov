function Egg(name, weight) {
    Food.call(this, name, weight);
}

Egg.prototype = Object.create(Food.prototype);