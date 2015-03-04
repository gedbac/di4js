var DieselEngine = function () {
};

DieselEngine.prototype.start = function () {
  console.log("Diesel engine has been started...");
};

var PetrolEngine = function () {
};

PetrolEngine.prototype.start = function () {
  console.log("Petrol engine has been started...");
};

function Car(engine) {
  this.engine = engine;
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
    .as(DieselEngine)
  .register('car')
    .as(Car);

var car = di.resolve('car');
car.start();

var child = di
  .create()
  .register('engine')
    .as(PetrolEngine);

car = child.resolve('car');
car.start();
