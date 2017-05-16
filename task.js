// Shape constructor
function Shape(name, type) {
    this.name = name;
    this.type = type;
}

Shape.prototype.getType = function() {
    return this.type;
};

Shape.prototype.getPerimeter = function() {
    if (this.type !== "circle")
        return Array.prototype.reduce.call(arguments, function(a, b) {
            return a + b;
        });
    else
        return;
};

Shape.prototype.draw = function() {
    console.log(this.name + " is drawn");
};

// Triangle constructor
function Triangle(name, a, b, c) {
    Shape.call(this, name, "triangle");
    this.a = a;
    this.b = b;
    this.c = c;
}

Triangle.prototype = Object.create(Shape.prototype);

Triangle.prototype.getPerimeter = function() {
    return this.a + this.b + this.c;
};

const newTriangle = new Triangle("newTriangle", 1, 2, 3);
newTriangle.draw();
console.log(newTriangle.getType());
console.log(newTriangle.getPerimeter());


// Square constructor
function Square(name, a, b, c, d) {
    Shape.call(this, name, "square");
    this.sides = Array.prototype.slice.call(arguments, 1, arguments.length);
}

Square.prototype = Object.create(Shape.prototype);

Square.prototype.getPerimeter = function() {
    return this.sides.reduce(function(a, b) {
        return a + b;
    });
};

// Polyhedron constructor
function Polyhedron(name, a, b) {
    Square.apply(this, arguments);
    this.type = "Polyhedron";
}

Polyhedron.prototype = Object.create(Square.prototype);

Polyhedron.prototype.getSidesCount = function() {
    return this.sides.length;
};

Polyhedron.prototype.getArea = function() {
    return this.sides.reduce(function(a, b) {
        return a * b;
    });
};

const newPolyhedron = new Polyhedron("newPolyhedron", 2, 3, 1, 4, 1, 1);
newPolyhedron.draw();
console.log(newPolyhedron.getType());
console.log(newPolyhedron.getSidesCount());
console.log(newPolyhedron.getPerimeter());
console.log(newPolyhedron.getArea());