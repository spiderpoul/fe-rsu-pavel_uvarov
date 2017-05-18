function Cacao(name, weight) {
    Food.call(this, name, weight);
}

Cacao.prototype = Object.create(Food.prototype);