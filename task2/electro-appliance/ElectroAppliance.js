function ElectroAppliance(name, power) {
    this.name = name;
    this.power = power;
    this.plugIn = false;
}

ElectroAppliance.prototype.plugInDevice = function() {
    this.plugIn = true;
};

ElectroAppliance.prototype.isPlugIn = function() {
    return this.plugIn;
};

ElectroAppliance.prototype.getName = function () {
    return this.name;
};

ElectroAppliance.prototype.getPower = function () {
    return this.power;
};