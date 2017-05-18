function Apple(name, weight) {
    Food.call(this, name, weight);
}

Apple.prototype = Object.create(Food.prototype);