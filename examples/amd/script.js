define(['di4js'], function (di) {
  
  function Engine(hp) {
    this.hp = hp;
  }

  Engine.prototype.start = function () {
    console.log("Engine with " + this.hp + " hp has been started...");
  }
  
  di
    .register("engine")
      .as(Engine)
        .withConstructor()
          .param().val(256);
  
  var engine = di.resolve("engine");
  
  engine.start();

});