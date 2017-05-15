function EventEmitter() {
    this.listeners = [];
}

EventEmitter.prototype.subscribe = function (handler) {
    this.listeners.push(handler);
}

EventEmitter.prototype.notify = function (data) {
    for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i](data);
    }
}