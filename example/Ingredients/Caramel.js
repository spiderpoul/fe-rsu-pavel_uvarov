function Caramel(name, weight) {
    Food.call(this, name, weight);
}

Caramel.prototype = Object.create(Food.prototype);