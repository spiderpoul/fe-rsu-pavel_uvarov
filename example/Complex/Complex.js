function Complex(name, foods) {
    this.foods = foods;
    Food.call(this, name, this.getWeight());
}

Complex.prototype = Object.create(Food.prototype);

Complex.prototype.getWeight = function () {
    var totalWeight = 0;

    for (var i = 0; i < this.foods.length; i++) {
        totalWeight += this.foods[i].getWeight();
    }

    return totalWeight;
};

Complex.prototype.showWeight = function () {
    console.info('Weight of ' + this.getName() + ' is ' + this.getWeight());
};

Complex.prototype.search = function (what) {
    this.checkIfHas(what);

    this.foods.forEach(function (food) {
        food.checkIfHas(what);
    })
};