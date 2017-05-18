function Kettle(name, power) {
    ElectroAppliance.apply(this, arguments);
}

Kettle.prototype = Object.create(ElectroAppliance.prototype);