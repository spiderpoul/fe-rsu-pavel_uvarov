function Flour(name, weight) {
    Food.call(this, name, weight);
}

Flour.prototype = Object.create(Food.prototype);