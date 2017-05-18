function Fridge(name, power) {
    ElectroAppliance.apply(this, arguments);
}

Fridge.prototype = Object.create(ElectroAppliance.prototype);