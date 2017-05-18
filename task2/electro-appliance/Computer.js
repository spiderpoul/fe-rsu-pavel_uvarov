function Computer(name, power) {
    ElectroAppliance.apply(this, arguments);
}

Computer.prototype = Object.create(ElectroAppliance.prototype);