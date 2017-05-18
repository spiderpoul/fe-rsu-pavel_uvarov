function MicroWave(name, power) {
    ElectroAppliance.apply(this, arguments);
}

MicroWave.prototype = Object.create(ElectroAppliance.prototype);