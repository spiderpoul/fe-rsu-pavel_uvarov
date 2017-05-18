function WashingMashine(name, power) {
    ElectroAppliance.apply(this, arguments);
}

WashingMashine.prototype = Object.create(ElectroAppliance.prototype);