function Full() {
    Middle.call(this);

    var gingerbread = new Gingerbread('Gingerbread with lime');
    var jujube = new Jujube('Jujube');
    var zephyr = new Zephyr('Zephyr');

    this.name = 'Full Present';
    this.foods = this.foods.concat([gingerbread, jujube, zephyr]);
}

Full.prototype = Object.create(Middle.prototype);