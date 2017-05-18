function Tv(name, power) {
    ElectroAppliance.apply(this, arguments);
}

Tv.prototype = Object.create(ElectroAppliance.prototype);