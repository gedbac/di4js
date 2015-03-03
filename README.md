# di4js

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![devDependency Status](https://david-dm.org/gedbac/di4js/dev-status.svg)](https://david-dm.org/gedbac/di4js#info=devDependencies)
[![Build Status](https://secure.travis-ci.org/gedbac/di4js.svg)](http://travis-ci.org/gedbac/di4js)

The __di4js__ module is dependency injection implementation in JavaScript.
Dependency injection is a software design pattern that allows the removal of
hard-coded dependencies and makes it possible to change them. __di4js__  is free
software distributed under the terms of the MIT License (MIT) and can be used
with __web browsers__ or with __node.js__.

    var Car = function (engine, year) {
      this.engine = engine;
	  this.year = year;
    };

    Car.prototype.start = function () {
      this.engine.start();
    };

    var DieselEngine = function () {
      this.hp = 0;
    };

    DieselEngine.prototype.start = function () {
      console.log("Diesel engine with " + this.hp + " hp has been started...");
    };

    di
      .autowired(false)
      .register('dieselEngine')
        .as(DieselEngine)
        .withProperties()
          .prop('hp').val(42);
      .register('car')
        .as(Car)
        .withConstructor()
          .param().ref('dieselEngine')
		  .param().val(1976);

    var car = di.resolve('car');

    car.start(); // Diesel engine with 42 hp has been started...

## Overview

* [Supported platforms](#supported-platforms)
* [Installation](#installation)
	* [Node.js](#nodejs)
	* [Web Browser](#web-browser)
		* [Bower](#bower)
		* [NuGet](#nuget)
* [API](#api)
	* [autowired(value)](#diautowiredvalue)
    * [isAutowired](#diisautowired)
	* [register(name)](#diregistername)
		* [as(type)](#diastype)
		* [instance(instance)](#diinstanceinstance)
		* [asSingleton()](#diassingleton)
		* [withConstructor()](#diwithconstructor)
			* [param(name)](#diparamname)
		* [withProperties()](#diwithproperties)
			* [prop(name)](#dipropname)
            * [func(name)](#difuncname)
		* [val(instance)](#divalinstance)
		* [ref(name)](#direfname)
		* [setFactory(factory)](#disetfactoryfactory)
	* [resolve(name)](#diresolvename)
	* [create()](#dicreate)
	* [inject(func)](#diinjectfunc)
	* [contains(name)](#dicontainsname)
	* [setDefaultFactory(factory)](#disetdefaultfactoryfactory)
	* [setNameTransformer(transformer)](#disetnametransformertransformer)
    * [getDefaultDependencyResolver()](#digetdefaultdependencyresolver)
    * [setDefaultDependencyResolver(value)](#disetdefaultdependencyresolvervalue)
    * [debug](#didebug)
	* [dispose()](#didispose)
	* [version](#diversion)
* [License](#license)
* [Authors](#authors)

## Supported platforms

__di4js__ runs on all the following environments:

__Web browsers__

* [Chrome](http://www.google.com/chrome/ "Chrome")
* [Firefox](http://www.getfirefox.com/ "Firefox")
* [Internet Explorer (IE9+)](http://www.microsoft.com/windows/internet-explorer/default.aspx "Internet Explorer")

__Server-side platforms__

* [Node.js](http://nodejs.org/ "Node.js")

## Installation

### Node.js

To install __di4js__ module for Node.js, this command should be used:

	npm install di4js

Also __di4js__ module's loading statement should be added to main module:

	'use strict';

	var di = require('di4js');

	// Your code goes here...

### Web Browser

Theare are few options to install __di4js__ to the web  browser. Module can be downloaded or can be installed using __Bower__ or __NuGet__ package manager.

	<!DOCTYPE HTML>
	<html>
	<body>
	  <!-- Your code goes here...-->
	  <script src="./scripts/di4js.min.js"></script>
	</body>
	</html>

#### AMD

di4js is compatible with asynchronous module definition (AMD) and it can be loaded as ordinal module.

    define(['di4js'], function (di) {
    
    });

### Bower

To install __di4js__, run the following command.

	bower install di4js

### NuGet

In Visual Studio __di4js__ module can be installed using NuGet extension. To install __di4js__, run the following command in the package manager console.

	Install-Package di4js

## API

### di.autowired(value)

If autowired is enabled for dependency resolver, all type's or instance's dependencies are resolved automatically. By default autowired is disabled for dependency resolver. Parameter *value* is optional and has to be a boolean.

	di
	  .autowired()
      .register('engine')
        .as(DieselEngine)
		.withProperties()
      	  .prop('hp').val(42);
      .register('car')
        .as(Car);

    di.resolve('car'); // { engine: { hp: 42 } }
    
### di.isAutowired

Allows to check if autowired is enabled.

    di
      .autowired();
      
    di.isAutowired; // true

### di.register(name)

Defines registration's name. Parameter *name* is required and has to be a string.

	di.register('dieselEngine');

Multiple registration's can be defined for a single name. A list of instances will be returned while resolving such registration by name.

	di
		.register('engine')
			.instance(new DieselEngine())
		.register('engine')
			.instance(new PetrolEngine());

    var engines = di.resolve('engine'); // []

### di.as(type)

Maps a name with the given type. Parameter *type* is required and has to be a function.

	di.register('dieselEngine').as(DieselEngine);

### di.instance(instance)

Maps registration's name with the given instance. Parameter *instance* is required and can be any type.

	var engine = new DieselEngine();

	di.register('dieselEngine').instance(engine);

Various types can be used:

	di.register('number').instance(0);
	di.register('flag').instance(false);
	di.register('str').instance('Hello world!');
	di.register('date').instance(new Date());
	di.register('func').instance(function () { });
    di.register('obj').instance({});

### di.asSingleton()

Marks type as singleton. If type is marked as singleton, the same instance always will be returned.

	di
	  .register('dieselEngine')
		.as(DieselEngine)
        .asSingleton();

### di.withConstructor()

Allows to define constructor's parameters.

### di.param(name)

Defines constructor's parameter. Parameter *name* is optional and has to be a string or integer. It can represent parameter's name or index.

Parameter can be defined without name. Index will be assigned automatically.

    di
      .register('car')
        .as(Car)
        .withConstructor()
          .param().val(new DieselEngine())
          .param().val(1976);

    di.resolve('car'); // { engine: { hp: 0 }, year: 1976 }

Parameter can be defined by name or index.

    di
      .register('car')
        .as(Car)
        .withConstructor()
          .param('engine').val(new DieselEngine())
          .param(1).val(1976);

    di.resolve('car'); // { engine: { hp: 0 }, year: 1976 }

### di.withProperties()

Allows to define type's properties.

### di.prop(name)

Defines property. Parameter *name* is required and has to be a string.

	di
	  .register('dieselEngine')
	    .as(DieselEngine)
		.withProperties()
		  .prop('hp').val(140);
          
### di.func(name)

Defines function which has to be invoked while resoling type. Parameter *name* is required and has to be a string.

    di
      .register('car')
        .as(Car)
          .withProperties()
            .func('setEngine')
              .param().ref('dieselEngine');      

### di.val(instance)

Allows to define property's or constructor paramter's value. Parameter *instance* is required and can be any type.

Constructor parameter's value is defined.

	di
	  .register('dieselEngine')
	    .as(DieselEngine)
		.withConstructor()
		  .param().val(140);

Property's value is defined.

	di
	  .register('dieselEngine')
	    .as(DieselEngine)
		.withProperties()
		  .prop('hp').val(140);
          
Function paramter's value is defined.

    di
      .register('car')
        .as(Car)
          .withProperties()
            .func('setEngine')
              .param().val(new DieselEngine());

### di.ref(name)

Maps property or constructor's parameter with registered type in dependency resolver.

Constructor's parameter can be resolved while instantiating a type.

	di
	  .register('car')
		.withConstructor()
          .param().ref('dieselEngine');

Property can be resolved while instantiating a type.

	di
	  .register('car')
		.withProperties()
          .prop('engine').ref('dieselEngine');
          
Function's paramter can be resolved while resolving a type.

    di
      .register('car')
        .as(Car)
          .withProperties()
            .func('setEngine')
              .param().ref('dieselEngine');  

### di.setFactory(factory)

Replaces default factory which is used while instantiating a new instance. Parameter *factory* is required and it accepts function or object.

A function can be used:

	di
	  .register('dieselEngine')
	    .as(DieselEngine)
	    .setFactory(function (options) {
	      return new options.type();
	    });

An object which has a method *create* can be used:

	var CustomFactory = {
	  create: function (options) {
        return new options.type();
	  }
	};

    di
	  .register('dieselEngine')
	    .as(DieselEngine)
	    .setFactory(CustomFactory);

### di.resolve(name)

Resolves type or instance by name. Parameter *name* is required and has to be a string.

	di.register('dieselEngine').as(DieselEngine);

	var engine = di.resolve('dieselEngine');

### di.create()

Allows to create child container. It usefull when you want to have more when one container or container per specific scope, or to override parent's container do not making inpact on it.

	var child = di.create();
	child
	  .register('dieselEngine')
        .as(DieselEngine);

	di.contains('dieselEngine'); // false
	child.contains('dieselEngine'); // true

### di.inject(func)

Allows to to inject dependencies to the function or to the instantiated object.

Dependency are injected automatically by parameter's name to the function.

	di
	  .register('dieselEngine')
      	.as(DieselEngine);

	di.inject(function (dieselEngine) {
	  engine.start(); // Diesel engine with 0 hp has been started...
	});

An array notation can be used for injecting dependencies to the function.

	di
	  .register('dieselEngine')
      	.as(DieselEngine);

	di.inject(['dieselEngine', function (dieselEngine) {
	  engine.start(); // Diesel engine with 0 hp has been started...
	}]);

Properties of the object are set automatically by properties' names.

    di
      .register('engine')
        .as(DieselEngine);

    var car = new Car();
    di.inject(car); // { engine: { hp: 0 }, year: null }

Registration's name, which has to be applied while injecting dependencies to the function, can be passed to *inject* method.

    di
      .register('dieselEngine')
        .as(DieselEngine)
      .register('car')
        .as(Car)
          .withConstructor()
            .param().ref('dieselEngine')
            .param().val(2000);

    di.inject(function (engine, year) {
      engine.start(); // Diesel engine with 0 hp has been started...
    }, 'car');

Registration's name, which has to be applied while injecting dependencies to the object, can be passed to *inject* method.

    di
      .register('dieselEngine')
        .as(DieselEngine)
      .register('car')
        .as(Car)
          .withProperties()
            .prop('engine').ref('dieselEngine');

    var car = new Car();
    di.inject(car, 'car');

### di.contains(name)

Allows to check if type or instance is registered in dependency resolver with given name. Parameter *name* is required and has to be a string.

	di.resolve('dieselEngine'); // false

### di.setDefaultFactory(factory)

Replaces default factory of dependecy resolver. Factory is used to create instance from type's definition. Parameter *factory* is required and it accepts function or object.

A function can be used.

	di
	  .setDefaultFactory(function (options) {
	    return new options.type();
	  })
	  .register('dieselEngine')
	    .as(DieselEngine);

An object which has method *created* can be used.

	var customFactory = {
	  create: function options() {
	    return new options.type();
	  }
	};

	di
	  .setDefaultFactory(customFactory)
	  .register('dieselEngine')
	    .as(DieselEngine);

### di.setNameTransformer(transformer)

It is used to transform property's or constructor's parameter's name while resolving type's dependencies. Parameter *transformer* is required and it accepts function or object.

A function can be used.

	di
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

	di.resolve('tractor'); // { dieselEngine: { hp: 0 } }

An object which has method *transform* can be used.

	var customNameTransformer = {
	  transform: function (name) {
	    return name.replace(/([A-Z])/g, function (str) {
	      return '-' + str.toLowerCase();
	    });
	  }
	};

	di
	  .autowired(true)
	  .setNameTransformer(customNameTransformer)
	  .register('diesel-engine')
	    .as(DieselEngine)
	  .register('tractor')
	    .as(Tractor);

	di.resolve('tractor'); { dieselEngine: { hp: 0 } }
    
### di.getDefaultDependencyResolver()

Returns default dependency resolver.

### di.setDefaultDependencyResolver(value)

Allows to set default dependency resolver.

### di.debug

This flag allows to print an additional information to the output.

    di.debug = true;

### di.dispose()

Sets dependency resolver to initial state. All registered types and instances are removed from it.

	di
	  .register('dieselEngine')
	    .instance(new DieselEngine());

	di.dispose();

	di.resolve('dieselEngine'); // throws an exception

### di.version

Returns module's version.

	di.version; // 1.0.0

## License

This software is distributed under the terms of the MIT License (MIT).

## Authors

Gediminas Backevcius / [@gedbac](https://twitter.com/gedbac)