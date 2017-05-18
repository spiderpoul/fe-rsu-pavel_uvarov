function Middle() {
    Small.call(this);

    var snickers = new Snickers('Snickers XXL');
    var chupaChups = new ChupaChups('Chupa-Chups Apple');
    var cookie = new Cookie('Cookie');

    this.name = 'Middle Present';
    this.foods= this.foods.concat([snickers, chupaChups, cookie]);
}

Middle.prototype = Object.create(Small.prototype);