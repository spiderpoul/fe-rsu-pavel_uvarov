function Apartament(name, rooms, devices) {
    this.rooms = rooms;
    Room.call(this, name, devices);
}

Apartament.prototype = Object.create(Room.prototype);

Apartament.prototype.getPowerInHouse = function() {
    let totalPower = 0;
    this.rooms.forEach(function (room) {
        totalPower += room.getPower();
    }, this);
    return totalPower;
}

Apartament.prototype.findDeviceInHouse = function(nameOfDevice) {
    return this.rooms.forEach(function(room) {
        room.findDevice(nameOfDevice);
    });
}
