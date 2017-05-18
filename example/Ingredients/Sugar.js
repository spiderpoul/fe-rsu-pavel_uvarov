function Sugar(name, weight) {
    Food.call(this, name, weight);
}

Sugar.prototype = Object.create(Food.prototype);

Sugar.prototype.heat = function () {
    return new Caramel(this.name, this.weight);
};