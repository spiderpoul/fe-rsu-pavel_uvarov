function Gelatin(name, weight) {
    Food.call(this, name, weight);
}

Gelatin.prototype = Object.create(Food.prototype);