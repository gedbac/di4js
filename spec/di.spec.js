'use strict';

if (typeof require !== 'undefined') {
  var di = require('../lib/di4js.js');
}

describe("Spec", function () {

  var DieselEngine = function () {
    this.hp = 0;
  };

  DieselEngine.prototype.start = function () {
    console.log("Diesel engine with " + this.hp + " hp has been started...");
  };

  var Car = function (engine, year) {
    this.engine = engine;
    this.year = year;
  };

  Car.prototype.start = function () {
    this.engine.start();
  };

  var Tractor = function (dieselEngine) {
    this.dieselEngine = dieselEngine;
  };

  afterEach(function () {
    di.dispose();
  });

  it("should have property 'version'", function () {
    expect(di.version).not.toBeUndefined();
  });

  it("should have property 'autowired'", function () {
    expect(di.autowired).not.toBeUndefined();
  });

  it("should have method 'register'", function () {
    expect(di.register).not.toBeUndefined();
  });

  it("should have method 'as'", function () {
    expect(di.as).not.toBeUndefined();
  });

  it("should have method 'instance'", function () {
    expect(di.instance).not.toBeUndefined();
  });

  it("should have method 'asSingleton'", function () {
    expect(di.asSingleton).not.toBeUndefined();
  });

  it("should have method 'withConstructor'", function () {
    expect(di.withConstructor).not.toBeUndefined();
  });

  it("should have method 'param'", function () {
    expect(di.param).not.toBeUndefined();
  });

  it("should have method 'withProperties'", function () {
    expect(di.withProperties).not.toBeUndefined();
  });

  it("should have method 'property'", function () {
    expect(di.prop).not.toBeUndefined();
  });

  it("should have method 'val'", function () {
    expect(di.val).not.toBeUndefined();
  });

  it("should have method 'ref'", function () {
    expect(di.ref).not.toBeUndefined();
  });

  it("should have method 'contains'", function () {
    expect(di.contains).not.toBeUndefined();
  });

  it("should have method 'inject'", function () {
    expect(di.inject).not.toBeUndefined();
  });

  it("should have method 'create'", function () {
    expect(di.create).not.toBeUndefined();
  });

  it("should have method 'getDefaultFactory'", function () {
    expect(di.getDefaultFactory).not.toBeUndefined();
  });

  it("should have method 'setDefaultFactory'", function () {
    expect(di.setDefaultFactory).not.toBeUndefined();
  });

  it("should have method 'getNameTransformer'", function () {
    expect(di.getNameTransformer).not.toBeUndefined();
  });

  it("should have method 'setNameTransformer'", function () {
    expect(di.setNameTransformer).not.toBeUndefined();
  });

  it("should have method 'getRegistration'", function () {
    expect(di.getRegistration).not.toBeUndefined();
  });

  it("should have method 'dispose'", function () {
    expect(di.dispose).not.toBeUndefined();
  });

  it("should activate auto resolving", function () {
    di.autowired();
    expect(di.__defaultDependencyResolver.__autowired).toBe(true);
  });

  it("should resolve registered type", function () {
    di.register('dieselEngine').as(DieselEngine);
    var instance = di.resolve('dieselEngine');
    expect(instance).not.toBeNull();
  });

  it("should resolve registered instance", function () {
    var engine = new DieselEngine();
    di.register('dieselEngine').instance(engine);
    var instance = di.resolve('dieselEngine');
    expect(instance).toBe(engine);
  });

  it("should resolve singleton intstance", function () {
    di
      .register('dieselEngine')
        .as(DieselEngine)
        .asSingleton();
    var instance1 = di.resolve('dieselEngine');
    var instance2 = di.resolve('dieselEngine');
    expect(instance1).toBe(instance2);
  });

  it("should check if name is registered", function () {
    di.register('dieselEngine').as(DieselEngine);
    expect(di.contains('dieselEngine')).toBe(true);
  });

  it("should set custom factory", function () {
    di
      .register('dieselEngine')
        .as(DieselEngine)
        .setFactory(function (options) {
          var instance = new options.type();
          instance.hp = 156;
          return instance;
        });
    var instance = di.resolve('dieselEngine');
    expect(instance).not.toBeNull();
    expect(instance instanceof DieselEngine).toBe(true);
    expect(instance.hp).toBe(156);
  });

  it("should set properties", function () {
    di
      .register('dieselEngine')
        .as(DieselEngine)
        .withProperties()
          .prop('hp').val(42);
    var engine = di.resolve('dieselEngine');
    expect(engine.hp).toBe(42);
  });

  it("should pass parameters to the constructor", function () {
    var engine = new DieselEngine();
    di
      .register('car')
        .as(Car)
        .withConstructor()
          .param().val(engine)
          .param().val(1976);
    var instance = di.resolve('car');
    expect(instance).not.toBeNull();
    expect(instance.engine).toBe(engine);
    expect(instance.year).toBe(1976);
  });

  it("should resolve type", function () {
    di
      .register('dieselEngine')
        .as(DieselEngine)
        .withProperties()
          .prop('hp').val(152)
      .register('car')
        .as(Car)
        .withConstructor()
          .param().ref('dieselEngine')
          .param().val(1976);
    var instance = di.resolve('car');
    expect(instance).not.toBeNull();
  });

  it("should resolve type's dependencies automatically", function () {
    di
      .autowired()
      .register('engine')
        .as(DieselEngine)
      .register('car')
        .as(Car);
    var instance = di.resolve('car');
    expect(instance).not.toBeNull();
    expect(instance.engine).not.toBeUndefined();
  });

  it("should set default factory", function () {
    var engine = new DieselEngine();
    di
      .setDefaultFactory(function (options) {
        return engine;
      })
      .register('dieselEngine')
        .as(DieselEngine);
    var instance = di.resolve('dieselEngine');
    expect(instance).toBe(engine);
  });

  it("should dispose default resolver", function () {
    var callback = jasmine.createSpy();
    var mock = { dispose: callback };
    di.register('dieselEngine').instance(mock);
    di.dispose();
    expect(di.contains('dieselEngine')).toBe(false);
    expect(callback).toHaveBeenCalled();
  });

  it("should create child container", function () {
    var child = di.create();
    expect(child).not.toBeNull();
  });

  it("should inject dependencies to the module automatically", function () {
    var callback = jasmine.createSpy();
    var engine = new DieselEngine();
    di
      .register('dieselEngine')
        .instance(engine);
    di.inject(function (dieselEngine) {
      callback(dieselEngine);
    });
    expect(callback).toHaveBeenCalledWith(engine);
  });

  it("should inject dependencies to the module", function () {
    var callback = jasmine.createSpy();
    var engine = new DieselEngine();
    di
      .register('dieselEngine')
        .instance(engine)
      .register('car')
        .as(Car)
          .withConstructor()
            .param().ref('dieselEngine')
            .param().val(2000);
    di.inject(function (engine, year) {
      callback(engine, year);
    }, 'car');
    expect(callback).toHaveBeenCalledWith(engine, 2000);
  });

  it("should inject dependencies to the module using array's annotation", function () {
    var callback = jasmine.createSpy();
    var engine = new DieselEngine();
    di
      .register('dieselEngine')
        .instance(engine)
      .inject(['dieselEngine', callback]);
    expect(callback).toHaveBeenCalledWith(engine);
  });

  it("should inject values to the module using array's annotation", function () {
    var callback = jasmine.createSpy();
    var engine = new DieselEngine();
    di.inject([engine, 1987, callback]);
    expect(callback).toHaveBeenCalledWith(engine, 1987);
  });

  it("should inject dependencies to the object automatically", function () {
    var callback = jasmine.createSpy();
    var engine = new DieselEngine();
    di
      .register('engine')
        .instance(engine);
    var car = new Car();
    di.inject(car);
    expect(car.engine).toBe(engine);
  });

  it("should inject dependencies to the object", function () {
    var callback = jasmine.createSpy();
    var engine = new DieselEngine();
    di
      .register('dieselEngine')
        .instance(engine)
      .register('car')
        .as(Car)
          .withProperties()
            .prop('engine').ref('dieselEngine');
    var car = new Car();
    di.inject(car, 'car');
    expect(car.engine).toBe(engine);
  });

  it("shoudl create a child container", function () {
    di
      .register('dieselEngine')
        .as(DieselEngine);
    var resolver = di.create();
    expect(resolver).not.toBeNull();
  });

  describe("class's 'DependencyResolverException' spec", function () {

    it("should create a new instance of 'DependencyResolverException' class", function () {
      var ex = new di.DependencyResolverException();
      expect(ex).not.toBeNull();
      expect(ex.message).toBe("A dependency resolver exception has occurred.");
    });

    it("should create a new instance of 'DependencyResolverException' class with parameters", function () {
      var errorMessage = "An error has occurred.";
      var ex = new di.DependencyResolverException(errorMessage);
      expect(ex).not.toBeNull();
      expect(ex.message).toBe(errorMessage);
    });

    it("should have stack trace", function () {
      try {
        throw new di.DependencyResolverException();
      } catch (ex) {
        expect(ex.stack).not.toBeNull();
      }
    });

  });

  describe("class's 'InstanceFactoryOptions' spec", function () {

    it("should create a new instance of 'InstanceFactoryOptions' class", function () {
      var options = new di.InstanceFactoryOptions();
      expect(options).not.toBeNull();
    });

    it("should create a new instance of 'InstanceFactoryOptions' class with parameters", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'dieselEngine',
        type: DieselEngine,
        parameters: []
      });
      expect(options).not.toBeNull();
      expect(options.name).toBe('dieselEngine');
      expect(options.type).toBe(DieselEngine);
      expect(options.parameters).not.toBeNull();
    });

    it("shoud throw an exception if options object contains a property which is not defined the " +
      "'InstanceFactoryOptions' class", function () {
      expect(function () {
        var options = new di.InstanceFactoryOptions({
          unknown: {}
        });
      }).toThrow();
    });

  });

  describe("class's 'InstanceFactory' spec", function () {

    var factory = null;

    beforeEach(function () {
      factory = new di.InstanceFactory();
    });

    afterEach(function () {
      factory = null;
    });

    it("should create a new instance of 'InstanceFactoryOptions' class", function () {
      expect(factory).not.toBeNull();
    });

    it("should create a new instance from a given type", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'dieselEngine',
        type: DieselEngine
      });
      var instance = factory.create(options);
      expect(instance).not.toBeNull();
      expect(instance instanceof DieselEngine).toBe(true);
    });

    it("should create a new instance from a given type and with parameters", function () {
      var engine = new DieselEngine();
      var options = new di.InstanceFactoryOptions({
        name: 'car',
        type: Car,
        parameters: [ engine, 1976 ]
      });
      var instance = factory.create(options);
      expect(instance).not.toBeNull();
      expect(instance instanceof Car).toBe(true);
      expect(instance.engine).toBe(engine);
      expect(instance.year).toBe(1976);
    });

    it("should throw an exception if type is 'Number'", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'number',
        type: Number
      });
      expect(function () {
        factory.create(options);
      }).toThrow();
    });

    it("should throw an exception if type is 'Date'", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'date',
        type: Date
      });
      expect(function () {
        factory.create(options);
      }).toThrow();
    });

    it("should throw an exception if type is 'Boolean'", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'boolean',
        type: Boolean
      });
      expect(function () {
        factory.create(options);
      }).toThrow();
    });

    it("should throw an exception if type is 'String'", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'string',
        type: String
      });
      expect(function () {
        factory.create(options);
      }).toThrow();
    });

    it("should throw an exception if type is 'Array'", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'array',
        type: Array
      });
      expect(function () {
        factory.create(options);
      }).toThrow();
    });

    it("should throw an exception if type is 'Function'", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'function',
        type: Function
      });
      expect(function () {
        factory.create(options);
      }).toThrow();
    });

    it("should throw an exception if type is 'RegExp'", function () {
      var options = new di.InstanceFactoryOptions({
        name: 'regExp',
        type: RegExp
      });
      expect(function () {
        factory.create(options);
      }).toThrow();
    });

    it("should throw an exception if options parameter is not passed to method 'create'", function () {
      expect(function () {
        var instance = factory.create(null);
      }).toThrow();
    });

    it("should throw an exception if type is invalid", function () {
      expect(function () {
        var instance = factory.create({ type: {} });
      }).toThrow();
    });

    it("should throw an exception if type is not set", function () {
      expect(function () {
        var instance = factory.create({});
      }).toThrow();
    });

  });

  describe("class's 'NameTransformer' spec", function () {

    var transformer = null;

    beforeEach(function () {
      transformer = new di.NameTransformer();
    });

    afterEach(function () {
      transformer = null;
    });

    it("should return the same name", function () {
      var name = 'engine';
      var result = transformer.transform(name);
      expect(result).toBe(name);
    });

    it("should throw an exception if parameter 'name' is not passed to method 'transform'", function () {
      expect(function () {
        transformer.transform(null);
      }).toThrow();
    });

  });

  describe("class's 'DependencyResolver' spec", function () {

    var resolver = null;

    beforeEach(function () {
      resolver = new di.DependencyResolver();
    });

    afterEach(function () {
      resolver = null;
    });

    it("should create a new instance of 'DependencyResolver' class", function () {
      expect(resolver).not.toBeNull();
    });

    it("should set registration name", function () {
      expect(function () {
        resolver.register('dieselEngine');
      }).not.toThrow();
    });

    it("should throw an exception if the parameter 'name' is not passed to the method 'register'", function () {
      expect(function () {
        resolver.register(null);
      }).toThrow();
    });

    it("should throw an exception if the parameter 'name' of type 'string' is not passed to method 'register'",
      function () {
      expect(function () {
        resolver.register(42);
      }).toThrow();
    });

    it("should throw an exception while invoking the method 'as', if no name is registered", function () {
      expect(function () {
        resolver.as(DieselEngine);
      }).toThrow();
    });

    it("should throw an exception if the type is not passed to the method 'as'", function () {
      expect(function () {
        resolver.as(null);
      }).toThrow();
    });

    it("should throw an exception if type is not a function", function () {
      expect(function () {
        resolver.as({});
      }).toThrow();
    });

    it("should resolve registered type", function () {
      resolver
        .register('dieselEngine')
          .as(DieselEngine);
      var instance = resolver.resolve('dieselEngine');
      expect(instance).not.toBeNull();
    });

    it("should resolve type's dependencies automatically", function () {
      resolver
        .autowired()
        .register('engine')
          .as(DieselEngine)
        .register('car')
          .as(Car);
      var instance = resolver.resolve('car');
      expect(instance).not.toBeNull();
      expect(instance.engine).not.toBeUndefined();
    });

    it("should throw an exception while invoking the method 'instance', if no name is registered", function () {
      var engine = new DieselEngine();
      expect(function () {
        resolver.instance(engine);
      }).toThrow();
    });

    it("should throw an exception if the instance is not passed to the method 'instance'", function () {
      expect(function () {
        resolver.instance(null);
      }).toThrow();
    });

    it("should resolve registered object", function () {
      var engine = new DieselEngine();
      resolver.register('dieselEngine').instance(engine);
      var instance = resolver.resolve('dieselEngine');
      expect(instance).toBe(engine);
    });

    it("should resolve registered number", function () {
      var value = 0;
      resolver.register('number').instance(value);
      var instance = resolver.resolve('number');
      expect(instance).toBe(value);
    });

    it("should resolve registerd boolean", function () {
      var value = false;
      resolver.register('flag').instance(value);
      var instance = resolver.resolve('flag');
      expect(instance).toBe(value);
    });

    it("should resolve registered string", function () {
      var value = 'Hello world!';
      resolver.register('str').instance(value);
      var instance = resolver.resolve('str');
      expect(instance).toBe(value);
    });

    it("should resolve registered date", function () {
      var date = new Date(2013, 12, 14);
      resolver.register('date').instance(date);
      var instance = resolver.resolve('date');
      expect(instance).toBe(date);
    });

    it("should resolve registered function", function () {
      var value = function () {};
      resolver.register('func').instance(value);
      var instance = resolver.resolve('func');
      expect(instance).toBe(value);
    });

    it("should resolve registered object", function () {
      var value = {};
      resolver.register('obj').instance(value);
      var instance = resolver.resolve('obj');
      expect(instance).toBe(value);
    });

    it("should throw an exception while invoking the method 'asSingleton', if no name is registered", function () {
      expect(function () {
        resolver.asSingleton();
      }).toThrow();
    });

    it("should throw an exception while invoking the method 'asSingleton', if type is not mapped with name",
      function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .asSingleton();
      }).toThrow();
    });

    it("should throw an exception while invoking the method 'asSingleton', if name is mapped with instance",
      function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .instance(new DieselEngine())
            .asSingleton();
      }).toThrow();
    });

    it("should resolve singleton intstance", function () {
      resolver
        .register('dieselEngine')
          .as(DieselEngine)
          .asSingleton();
      var instance1 = resolver.resolve('dieselEngine');
      var instance2 = resolver.resolve('dieselEngine');
      expect(instance1).toBe(instance2);
    });

    it("should select constructor", function () {
      resolver
        .register('dieselEngine')
          .as(DieselEngine)
          .withConstructor();
      expect(resolver.__withConstructor).toBe(true);
    });

    it("should throw an exception while invoking the method 'withConstructor', if registration's name is not set",
      function () {
      expect(function () {
        resolver
          .withConstructor();
      }).toThrow();
    });

    it("should throw an exception while invoking the method 'withConstructor', if type is not set", function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .withConstructor();
      }).toThrow();
    });

    it("should set constructor's parameter by index", function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .as(DieselEngine)
            .withConstructor()
              .param(0).value(100)
          .register('car')
            .as(Car)
            .withConstructor()
              .param(1).value(2000)
              .param(0).ref('dieselEngine');
        var instance = resolver.resolve('car');
        expect(instance).not.toBeNull();
        expect(instance.year).toBe(2000);
        expect(instance.engine.hp).toBe(100);
      }).toThrow();
    });

    it("should set constructor's parameter by name", function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .as(DieselEngine)
            .withConstructor()
              .param('hp').value(100)
          .register('car')
            .as(Car)
            .withConstructor()
              .param('year').value(2000)
              .param('engine').ref('dieselEngine');
        var instance = resolver.resolve('car');
        expect(instance).not.toBeNull();
        expect(instance.year).toBe(2000);
        expect(instance.engine.hp).toBe(100);
      }).toThrow();
    });

    it("should set constructor's parameter by name and index", function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .as(DieselEngine)
            .withConstructor()
              .param('hp').value(100)
          .register('car')
            .as(Car)
            .withConstructor()
              .param(1).value(2000)
              .param('engine').ref('dieselEngine');
        var instance = resolver.resolve('car');
        expect(instance).not.toBeNull();
        expect(instance.year).toBe(2000);
        expect(instance.engine.hp).toBe(100);
      }).toThrow();
    });

    it("should throw an exception while overriding constructor's parameter without index in autowired mode",
      function () {
      expect(function () {
        resolver
          .autowired(true)
          .register('dieselEngine')
            .as(DieselEngine)
            .withConstructor()
              .param().val(1987);
      }).toThrow();
    });

    it("should select properties", function () {
      resolver
        .register('dieselEngine')
          .as(DieselEngine)
          .withProperties();
      expect(resolver.__withProperties).toBe(true);
    });

    it("should throw an exception while invoking the method 'withProperties', if registration's name is not set",
      function () {
      expect(function () {
        resolver
          .withProperties();
      }).toThrow();
    });

    it("should throw an exception while invoking the method 'withProperties', if type is not set", function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .withProperties();
      }).toThrow();
    });

    it("should throw an exception if parameter 'factory' is not passed to the method 'setFactory'", function () {
      expect(function () {
        resolver.setFactory(null);
      }).toThrow();
    });

    it("should throw an exception if parameter 'factory' of type 'number' is passed to method 'setFactory'",
      function () {
      expect(function () {
        resolver.setFactory(42);
      }).toThrow();
    });

    it("should throw an exception, if no name is register", function () {
      expect(function () {
        resolver.setFactory(function () {});
      }).toThrow();
    });

    it("should throw an exception, if type is not mapped with name", function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .setFactory(function () {});
      }).toThrow();
    });

    it("should throw an exception, if passed factory to the method 'setFactory' doesn't have 'create' method",
      function () {
      expect(function () {
        resolver
          .register('dieselEngine')
            .setFactory({});
      }).toThrow();
    });

    it("should register passed function to the method 'setFactory' as factory", function () {
      var engine = new DieselEngine();
      resolver
        .register('dieselEngine')
          .as(DieselEngine)
          .setFactory(function () { return engine; });
      var instance = resolver.resolve('dieselEngine');
      expect(instance).toBe(engine);
    });

    it("should register passed object to the method 'setFactory' as factory", function () {
      var engine = new DieselEngine();
      var factory = {
        create: function () {
          return engine;
        }
      };
      resolver
        .register('dieselEngine')
          .as(DieselEngine)
          .setFactory(factory);
      var instance = resolver.resolve('dieselEngine');
      expect(instance).toBe(engine);
    });

    it("should throw an exception if parameter 'name' is not passed to the method 'contains'", function () {
      expect(function () {
        resolver.contains(null);
      }).toThrow();
    });

    it("should throw an exception if the parameter 'name' of type 'string' is not passed to method 'contains'",
      function () {
      expect(function () {
        resolver.contains({});
      }).toThrow();
    });

    it("should check if name is registered", function () {
      resolver.register('dieselEngine').as(DieselEngine);
      expect(resolver.contains('dieselEngine')).toBe(true);
    });

    it("should check if name is registered", function () {
      resolver
        .register('diesel-engine')
          .as(DieselEngine);
      expect(resolver.contains('diesel-engine')).toBe(true);
    });

    it("should throw an exception if the parameter 'name' is not passed to the method 'resolve'", function () {
      expect(function () {
        resolver.resolve(null);
      }).toThrow();
    });

    it("should throw an exception if the parameter 'name' of type 'string' is not passed to method 'resolve'",
      function () {
      expect(function () {
        resolver.resolve(42);
      }).toThrow();
    });

    it("should throw an exception if passed name is not registered", function () {
      expect(function () {
        resolver.resolve('dieselEngine');
      }).toThrow();
    });

    it("should set passed function to the method 'setNameTransformer' as transformer", function () {
      resolver
        .autowired(true)
        .setNameTransformer(function (name) {
          return name.replace(/([A-Z])/g, function (str) {
            return '-' + str.toLowerCase();
          });
        })
        .register('diesel-engine')
          .as(DieselEngine)
        .register('tractor')
          .as(Tractor);
      var instance = resolver.resolve('tractor');
      expect(instance).not.toBeNull();
      expect(instance.dieselEngine).not.toBeNull();
    });

    it("should set passed object to the method 'setNameTransformer' as transformer", function () {
      var customNameTransformer = {
        transform: function (name) {
          return name.replace(/([A-Z])/g, function (str) {
            return '-' + str.toLowerCase();
          });
        }
      };
      resolver
        .autowired(true)
        .setNameTransformer(customNameTransformer)
        .register('diesel-engine')
          .as(DieselEngine)
        .register('tractor')
          .as(Tractor);
      var instance = resolver.resolve('tractor');
      expect(instance).not.toBeNull();
      expect(instance.dieselEngine).not.toBeNull();
    });

    it("should dispose resolver", function () {
      var callback = jasmine.createSpy();
      var mock = { dispose: callback };
      resolver.register('dieselEngine').instance(mock);
      resolver.dispose();
      expect(resolver.contains('dieselEngine')).toBe(false);
      expect(callback).toHaveBeenCalled();
    });

    it("should return default factory", function () {
      var factory = resolver.getDefaultFactory();
      expect(factory).not.toBeNull();
    });

    it("should throw an exception if parameter 'factory' is not passed to the method 'setDefaultFactory'",
      function () {
      expect(function () {
        resolver.setDefaultFactory(null);
      }).toThrow();
    });

    it("should throw an exception if parameter 'factory' of type 'number' is passed to method 'setDefaultFactory'",
      function () {
      expect(function () {
        resolver.setDefaultFactory(42);
      }).toThrow();
    });

    it("should throw an exception, if passed factory to the method 'setDefaultFactory' doesn't have " +
      "'create' method", function () {
      expect(function () {
        resolver
          .setDefaultFactory({});
      }).toThrow();
    });

    it("should register passed function to the method 'setDefaultFactory' as factory", function () {
      var engine = new DieselEngine();
      resolver
        .setDefaultFactory(function () { return engine; })
        .register('dieselEngine')
          .as(DieselEngine);
      var instance = resolver.resolve('dieselEngine');
      expect(instance).toBe(engine);
    });

    it("should register passed object to the method 'setDefaultFactory' as factory", function () {
      var engine = new DieselEngine();
      var factory = {
        create: function () {
          return engine;
        }
      };
      resolver
        .setDefaultFactory(factory)
        .register('dieselEngine')
          .as(DieselEngine);
      var instance = resolver.resolve('dieselEngine');
      expect(instance).toBe(engine);
    });

    it("should throw circular dependency exception", function () {
      resolver
        .register('dieselEngine')
          .as(DieselEngine)
            .withProperties()
              .prop('hp').ref('dieselEngine');
      expect(function () {
        resolver.resolve('dieselEngine');
      }).toThrow();
    });

    it("should create child container", function () {
      resolver
        .register('dieselEngine')
          .as(DieselEngine);
      var child = resolver.create();
      expect(child).not.toBeNull();
    });

    it("should contain inherited registration from the parent", function () {
      resolver
        .register('dieselEngine')
          .as(DieselEngine);
      var child = resolver.create();
      expect(child.contains('dieselEngine')).toBe(true);
    });

    it("should override registration from the parent", function () {
      var engine1 = new DieselEngine();
      var engine2 = new DieselEngine();
      resolver
        .register('dieselEngine')
          .instance(engine1);
      var child = resolver.create();
      child
        .register('dieselEngine')
          .instance(engine2);
      var instance = child.resolve('dieselEngine');
      expect(instance).toBe(engine2);
    });

    it("should resolve type wich has overridden 'toString' function", function () {
      var MyCustomType = function () {};
      MyCustomType.toString = function () {
        return "[Class MyCustomType]";
      };
      var child = resolver.create();
      child
        .autowired(true)
        .register('myCustomType')
          .as(MyCustomType);
      var instance = child.resolve('myCustomType');
      expect(instance).not.toBeNull();
    });

  });

});