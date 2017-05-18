function Application() {

}

Application.prototype.start = function () {
    const fridge = new Fridge("fridge", 600);
    const kettle = new Kettle("kettle", 400);
    const tv = new Tv("TV", 300);
    const computer = new Computer("Computer", 200);

    const kitchen = new Room("kitchen", [fridge, kettle]);
    const livingRoom = new Room("living room", [tv, computer]);

    const myHouse = new Apartament("My house", [kitchen, livingRoom]);

    fridge.plugInDevice();
    kettle.plugInDevice();
    tv.plugInDevice();
    computer.plugInDevice();

    console.log(kitchen.getPower());
    kitchen.findDevice("kettle");
    
    console.log(myHouse.getPowerInHouse());
    myHouse.findDeviceInHouse("computer");
};