function Small() {
    var snickers = new Snickers('Snickers XXL');
    Present.call(this, 'Small Present', [snickers]);
}

Small.prototype = Object.create(Present.prototype);