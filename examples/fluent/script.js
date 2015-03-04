function Engine(hp) {
  this.hp = hp;
}

Engine.prototype.start = function () {
  console.log("Engine with " + this.hp + " hp has been started...");
}

function Car(name) {
  this.name = name;
}

Car.prototype.setEngine = function (engine) {
  this.engine = engine;
  return this;
};

Car.prototype.start = function () {
  if (this.engine) {
    this.engine.start();
  }
  console.log("Car '" + this.name + "' has been started...");
}

function Driver(name) {
  this.name = name;
}

Driver.prototype.setCars = function (cars) {
  this.cars = cars;
  return this;
};  

Driver.prototype.drive = function (name) {
  if (this.cars && name) {
    if (this.cars instanceof Array) {
      for (var i = 0; i < this.cars.length; i++) {
        if (this.cars[i].name === name) {
          this.cars[i].start();
          break;
        }
      }
    } else if (this.cars.name === name) {
      this.cars.start();
    }
  }
}
  
di
  .register('engine')
    .as(Engine)
      .withConstructor()
        .param().val(256)
  .register('car')
    .as(Car)
      .withConstructor()
        .param().val('wv')
      .withProperties()
        .func('setEngine')
          .param().ref('engine')
  .register('car')
    .as(Car)
      .withConstructor()
        .param().val('ford')
      .withProperties()
        .func('setEngine')
          .param().ref('engine')
  .register('tom')
    .as(Driver)
      .withConstructor()
        .param().val('tom')
      .withProperties()
        .func('setCars')
          .param().ref('car');

var tom = di.resolve('tom');

tom.drive('wv');