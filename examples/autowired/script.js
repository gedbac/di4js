function Engine() {
  
}

Engine.prototype.start = function () {
  console.log("Engine has been started...");
}

function Car() {
  this.engine = null;
}

Car.prototype.start = function () {
  if (this.engine) {
    this.engine.start();
  }
  console.log("Car has been started...");
}

di
  .autowired(true)
  .register('engine')
    .as(Engine)
  .register('car')
    .as(Car);

var car = di.resolve('car');

car.start();