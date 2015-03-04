function Car(engine) {
  this.engine = engine;
}

Car.prototype.start = function () {
  if (this.engine) {
    this.engine.start();
  }
  console.log("Car has been started...");
}

describe("car", function() {
  
  it("should start a car", function() {
    
    var engineMock = jasmine.createSpyObj('engine', ['start']);
    
    var car = new Car(engineMock);
    car.start();
    
    expect(engineMock.start).toHaveBeenCalled();
    
  });
  
});