function Food(name, weight) {
    this.name = name;
    this.weight = weight;
}

Food.prototype.getName = function () {
    return this.name;
};

Food.prototype.getWeight = function () {
    return this.weight;
};

Food.prototype.checkIfHas = function (what) {
    if (this.getName().toLowerCase().indexOf(what.toLowerCase()) >= 0) {
        console.info('"' + what + '" has been found in "' + this.getName() + '"');
    }
};