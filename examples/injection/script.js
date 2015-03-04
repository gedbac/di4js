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

di.inject(function (car) { 
  car.start();
});

di.inject(['car', function (car) { 
  car.start();
}]);

var car = new Car();
di.inject(car);

car.start();

var car = new Car();
di.inject(car, 'car');

car.start();