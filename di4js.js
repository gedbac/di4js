var di = (function () {

  'use strict';

  var di = {};

  di.version = '1.0.6';

  di.DependencyResolverException = function (message) {
    this.__name = 'DependencyResolverException';
    this.__stack = null;
    this.__message = message || "A dependency resolver exception has occurred.";
    var lines, i, tmp;
    if ((typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Chrome') !== -1) ||
      (typeof navigator === 'undefined')) {
      lines = new Error().stack.split('\n');
      if (lines && lines.length > 2) {
        tmp = [];
        for (i = 2; i < lines.length; i++) {
          if (lines[i]) {
            tmp.push(lines[i].trim());
          }
        }
        this.stack = tmp.join('\n');
      }
    } else if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') !== -1) {
      lines = new Error().stack.split('\n');
      if (lines && lines.length > 1) {
        tmp = [];
        for (i = 1; i < lines.length; i++) {
          if (lines[i]) {
            tmp.push('at ' + lines[i].trim().replace('@', ' (') + ')');
          }
        }
        this.stack = tmp.join('\n');
      }
    } else if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Trident') !== -1) {
      try {
        throw new Error();
      } catch (error) {
        if ('stack' in error) {
          lines = error.stack.split('\n');
          if (lines && lines.length > 2) {
            tmp = [];
            for (i = 2; i < lines.length; i++) {
              if (lines[i]) {
                tmp.push(lines[i].trim());
              }
            }
            this.stack = tmp.join('\n');
          }
        } else {
          this.stack = '';
        }
      }
    } else {
      var error = new Error();
      if ('stack' in error) {
        this.stack = error.stack;
      } else {
        this.stack = '';
      }
    }
    Object.defineProperty(this, '__name', { enumerable: false });
    Object.defineProperty(this, '__message', { enumerable: false });
    Object.defineProperty(this, '__stack', { enumerable: false });
    Object.seal(this);
  };
  
  di.DependencyResolverException.prototype = {
  
    get name() {
      return this.__name;
    },
  
    set name(value) {
      this.__name = value;
    },
  
    get message() {
      return this.__message;
    },
  
    set message(value) {
      this.__message = value;
    },
  
    get stack() {
      return this.__stack;
    },
  
    set stack(value) {
      this.__stack = value;
    },
  
    toString: function () {
      var msg = this.name + ': ' + this.message;
      if (this.stack) {
        msg += '\n\t' + this.stack.replace(/\n/g, '\n\t');
      }
      return msg;
    }
  
  };
  
  Object.seal(di.DependencyResolverException);
  Object.seal(di.DependencyResolverException.prototype);

  di.InstanceFactoryOptions = function (options) {
    this.__name = null;
    this.__type = null;
    this.__parameters = null;
    if (options) {
      for (var propertyName in options) {
        if (propertyName in this) {
          this[propertyName] = options[propertyName];
        } else {
          throw new di.DependencyResolverException("Class 'di.InstanceFactoryOptions' doesn't have a property '" +
            propertyName + "'");
        }
      }
    }
    Object.defineProperty(this, '__name', { enumerable: false });
    Object.defineProperty(this, '__type', { enumerable: false });
    Object.defineProperty(this, '__parameters', { enumerable: false });
    Object.seal(this);
  };
  
  di.InstanceFactoryOptions.prototype = {
  
    get name() {
      return this.__name;
    },
  
    set name(value) {
      this.__name = value;
    },
  
    get type() {
      return this.__type;
    },
  
    set type(value) {
      this.__type = value;
    },
  
    get parameters() {
      return this.__parameters;
    },
  
    set parameters(value) {
      this.__parameters = value;
    },
  
    toString: function () {
      return '[object di.InstanceFactoryOptions]';
    }
  
  };
  
  Object.seal(di.InstanceFactoryOptions);
  Object.seal(di.InstanceFactoryOptions.prototype);

  di.IInstanceFactory = {
  
    create: function (options) {},
  
    toString: function () {
      return '[object di.IInstanceFactory]';
    }
  
  };
  
  Object.freeze(di.IInstanceFactory);

  di.InstanceFactory = function () {
    Object.seal(this);
  };
  
  di.InstanceFactory.prototype = {
  
    create: function (options) {
      if (!options) {
        throw new di.DependencyResolverException("Parameter 'options' is not set");
      }
      if ('type' in options && !options.type) {
        throw new di.DependencyResolverException("Factory can't create object, because type is not set");
      }
      if (typeof options.type !== 'function') {
        throw new di.DependencyResolverException("Factory can't create object, because given type is not a function");
      }
      if (options.type === Number || options.type === Date || options.type === Boolean || options.type === String ||
        options.type === Array || options.type === Function || options.type === RegExp) {
        throw new di.DependencyResolverException("Basic type can not be instantiated using a factory");
      }
      var instance = null;
      if (options.parameters && options.parameters.length > 0) {
        instance = Object.create(options.type.prototype);
        options.type.apply(instance, options.parameters);
      } else {
        instance = new options.type();
      }
      return instance;
    },
  
    toString: function () {
      return '[object di.InstanceFactory]';
    }
  
  };
  
  Object.seal(di.InstanceFactory);
  Object.seal(di.InstanceFactory.prototype);

  di.INameTransformer = {
  
    transform: function (name) {},
  
    toString: function () {
      return '[object di.INameTransformer]';
    }
  
  };
  
  Object.freeze(di.INameTransformer);

  di.NameTransformer = function () {
    Object.seal(this);
  };
  
  di.NameTransformer.prototype = {
  
    transform: function (name) {
      if (!name) {
        throw new di.DependencyResolverException("Parameter 'name' is not passed to the method 'transform'");
      }
      return name;
    },
  
    toString: function () {
      return '[object di.NameTransformer]';
    }
  
  };
  
  Object.seal(di.NameTransformer);
  Object.seal(di.NameTransformer.prototype);

  di.IDependencyResolver = {
  
    autowired: function (value) {},
  
    register: function (name) {},
  
    as: function (type) {},
  
    instance: function (instance) {},
  
    asSingleton: function () {},
  
    withConstructor: function () {},
  
    param: function (name) {},
  
    withProperties: function (name) {},
  
    prop: function (name) {},
  
    val: function (instance) {},
  
    ref: function (name) {},
  
    setFactory: function (factory) {},
  
    create: function () {},
  
    inject: function (func, name) {},
  
    contains: function (name) {},
  
    resolve: function (name) {},
  
    getDefaultFactory: function () {},
  
    setDefaultFactory: function (factory) {},
  
    getNameTransformer: function () {},
  
    setNameTransformer: function (transformer) {},
  
    getRegistration: function (name) {},
  
    dispose: function () {},
  
    toString: function () {
      return '[object di.IDependencyResolver]';
    }
  
  };
  
  Object.freeze(di.IDependencyResolver);

  di.DependencyResolver = function (parent) {
    this.__parent = parent;
    this.__defaultFactory = null;
    this.__nameTransformer = null;
    this.__autowired = false;
    this.__container = null;
    this.__registration = null;
    this.__withProperties = false;
    this.__withConstructor = false;
    this.__parameter = null;
    this.__property = null;
    Object.defineProperty(this, '__parent', { enumerable: false });
    Object.defineProperty(this, '__defaultFactory', { enumerable: false });
    Object.defineProperty(this, '__nameTransformer', { enumerable: false });
    Object.defineProperty(this, '__autowired', { enumerable: false });
    Object.defineProperty(this, '__container', { enumerable: false });
    Object.defineProperty(this, '__registration', { enumerable: false });
    Object.defineProperty(this, '__withProperties', { enumerable: false });
    Object.defineProperty(this, '__withConstructor', { enumerable: false });
    Object.defineProperty(this, '__parameter', { enumerable: false });
    Object.defineProperty(this, '__property', { enumerable: false });
    Object.seal(this);
  };
  
  di.DependencyResolver.prototype = {
  
    autowired: function (value) {
      if (value === undefined || value === null) {
        value = true;
      }
      if (typeof value !== 'boolean') {
        throw new di.DependencyResolverException("Parameter 'value' passed to the method 'autowired' has to " +
          "be a 'boolean'");
      }
      this.__autowired = value;
      return this;
    },
  
    register: function (name) {
      if (!name) {
        throw new di.DependencyResolverException("Parameter 'name' is not passed to the method 'register'");
      }
      if (typeof name !== 'string') {
        throw new di.DependencyResolverException("Parameter 'name' passed to the method 'register' has to be " +
          "a 'string'");
      }
      if (!this.__container) {
        this.__container = {};
      }
      var registration;
      if (!(name in this.__container)) {
        this.__container[name] = {
          name: name,
          singleton: false,
          type: null,
          instance: null,
          factory: null,
          dependencies: null
        };
      }
      this.__registration = this.__container[name];
      this.__withConstructor = false;
      this.__withProperties = false;
      this.__parameter = null;
      this.__property = null;
      return this;
    },
  
    as: function (type) {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!type) {
        throw new di.DependencyResolverException("Parameter 'type' is not passed to the method 'as' for " +
          "registration '" + this.__registration.name + "'");
      }
      if (typeof type !== 'function') {
        throw new di.DependencyResolverException("Parameter 'type' passed to the method 'as' has to be a 'function' " +
          "for registration '" + this.__registration.name + "'");
      }
      this.__registration.instance = null;
      this.__registration.type = type;
      this.__registration.singleton = false;
      this.__registration.dependencies = {
        parameters: [],
        properties: []
      };
      this.__withConstructor = false;
      this.__withProperties = false;
      this.__parameter = null;
      this.__property = null;
      return this;
    },
  
    instance: function (instance) {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (instance === null || instance === undefined) {
        throw new di.DependencyResolverException("Parameter 'instance' is not passed to the method 'instance' for " +
          "registration '" + this.__registration.name + "'");
      }
      this.__registration.instance = instance;
      this.__registration.type = null;
      this.__registration.factory = null;
      this.__registration.singleton = true;
      this.__registration.dependencies = null;
      this.__withConstructor = false;
      this.__withProperties = false;
      this.__parameter = null;
      this.__property = null;
      return this;
    },
  
    asSingleton: function () {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!this.__registration.type) {
        throw new di.DependencyResolverException("Type is not set for registration '" +
          this.__registration.name + "'");
      }
      this.__registration.singleton = true;
      this.__withConstructor = false;
      this.__withProperties = false;
      this.__parameter = null;
      this.__property = null;
      return this;
    },
  
    withConstructor: function () {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!this.__registration.type) {
        throw new di.DependencyResolverException("Type is not set for registration '" +
          this.__registration.name + "'");
      }
      this.__withConstructor = true;
      this.__withProperties = false;
      this.__parameter = null;
      this.__property = null;
      return this;
    },
  
    param: function (name) {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!this.__registration.type) {
        throw new di.DependencyResolverException("Type is not set for registration '" + this.__registration.name + "'");
      }
      if (!this.__withConstructor) {
        throw new di.DependencyResolverException("Invocation of method 'withConstructor' is missing for " +
          "registration '" + this.__registration.name + "'");
      }
      var parameters = this.__registration.dependencies.parameters,
          parameter = null,
          index;
      if (this.__autowired && (name === undefined || name === null)) {
        throw new di.DependencyResolverException("Parameter 'name' has to be passed to the method, when dependency " +
          "container has option 'autowired' enabled");
      }
      if (name !== null && name !== undefined) {
        if (typeof name === 'number') {
          index = name;
          name = undefined;
          if (index < 0) {
            throw di.DependencyResolverException("Parameter 'name' passed to the method 'param' is out of range for " +
              "registration '" + this.__registration.name + "'");
          }
          if (index < parameters.length) {
            parameter = parameters[index];
          }
        } else if (typeof name === 'string') {
          for (var i = 0; i < parameters.length; i++) {
            if (parameters[i].name === name) {
              parameter = parameters[i];
              break;
            }
          }
        } else {
          throw new di.DependencyResolverException("Parameter 'name' passed to the method 'param' has to " +
            "be a 'number' or a 'string' for registration '" + this.__registration.name + "'");
        }
      }
      if (!parameter) {
        parameter = {
          index: index,
          name: name,
          value: undefined,
          reference: undefined
        };
        parameters.push(parameter);
      }
      this.__parameter = parameter;
      this.__property = null;
      return this;
    },
  
    withProperties: function () {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!this.__registration.type) {
        throw new di.DependencyResolverException("Type is not set for registration '" + this.__registration.name + "'");
      }
      this.__withProperties = true;
      this.__withConstructor = false;
      this.__parameter = null;
      this.__property = null;
      return this;
    },
  
    prop: function (name) {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!name) {
        throw new di.DependencyResolverException("Parameter 'name' is not passed to the method 'prop' for " +
          "registration '" + this.__registration.name + "'");
      }
      if (typeof name !== 'string') {
        throw new di.DependencyResolverException("Parameter 'name' passed to the method 'prop' has to be" +
          " a 'string' for registration '" + this.__registration.name + "'");
      }
      if (!this.__registration.type) {
        throw new di.DependencyResolverException("Type is not set for registration '" + this.__registration.name + "'");
      }
      if (!this.__withProperties) {
        throw new di.DependencyResolverException("Invocation of method 'withProperties' is missing for " +
          "registration '" + this.__registration.name + "'");
      }
      var properties = this.__registration.dependencies.properties,
          property = null;
      for (var i = 0; i < properties.length; i++) {
        if (properties[i].name === name) {
          property = properties[i];
        }
      }
      if (!property) {
        property = {
          name: name,
          value: undefined,
          reference: undefined
        };
        properties.push(property);
      }
      this.__parameter = null;
      this.__property = property;
      return this;
    },
  
    val: function (instance) {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (instance === null || instance === undefined) {
        throw new di.DependencyResolverException("Parameter 'instance' is not passed to the method 'val'");
      }
      if (!this.__withProperties && !this.__withConstructor) {
        throw new di.DependencyResolverException("Invocation of method withConstructor' or 'withProperties' " +
          "is missing");
      }
      if (this.__withConstructor && !this.__parameter) {
        throw new di.DependencyResolverException("Parameter is not defined");
      }
      if (this.__withProperties && !this.__property) {
        throw new di.DependencyResolverException("Property is not defined");
      }
      if (this.__parameter) {
        this.__parameter.value = instance;
        this.__parameter.reference = undefined;
      } else if (this.__property) {
        this.__property.value = instance;
        this.__property.reference = undefined;
      }
      return this;
    },
  
    ref: function (name) {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!name) {
        throw new di.DependencyResolverException("Parameter 'name' is not passed to the method 'ref' for " +
          "registration '" + this.__registration.name + "'");
      }
      if (typeof name !== 'string') {
        throw new di.DependencyResolverException("Parameter 'name' passed to the method 'ref' has to " +
          "be a 'string' for registration '" + this.__registration.name + "'");
      }
      if (!this.__withProperties && !this.__withConstructor) {
        throw new di.DependencyResolverException("Invocation of method 'withConstructor' or 'withProperties' " +
          "is missing for registration '" + this.__registration.name + "'");
      }
      if (this.__withConstructor && !this.__parameter) {
        throw new di.DependencyResolverException("Parameter is not defined for registration '" +
          this.__registration.name + "'");
      }
      if (this.__withProperties && !this.__property) {
        throw new di.DependencyResolverException("Property is not defined for registration '" +
          this.__registration.name + "'");
      }
      if (!this.contains(name)) {
        throw di.DependencyResolverException("Type or instance is not registered with name '" + name + "'");
      }
      if (this.__parameter) {
        this.__parameter.value = undefined;
        this.__parameter.reference = name;
      } else if (this.__property) {
        this.__property.value = undefined;
        this.__property.reference = name;
      }
      return this;
    },
  
    setFactory: function (factory) {
      if (!this.__registration) {
        throw new di.DependencyResolverException("Registration's name is not defined");
      }
      if (!factory) {
        throw new di.DependencyResolverException("Parameter 'factory' is not passed to the method 'setFactory");
      }
      if (typeof factory !== 'function' && typeof factory !== 'object') {
        throw new di.DependencyResolverException("Parameter 'factory' passed to the method 'setFactory' has to be " +
          "a 'function' or 'object'");
      }
      if (typeof factory === 'object' && !('create' in factory)) {
        throw new di.DependencyResolverException("Factory's instance passed to the method 'setFactory' has to have " +
          "a method 'create'");
      }
      if (!this.__registration.type) {
        throw new di.DependencyResolverException("Type is not set for registration '" + this.__registration.name);
      }
      this.__registration.factory = factory;
      this.__withConstructor = false;
      this.__withProperties = false;
      this.__parameter = null;
      this.__property = null;
      return this;
    },
  
    create: function () {
      return new di.DependencyResolver(this);
    },
  
    inject: function (func) {
      if (!func) {
        throw new di.DependencyResolverException("Parameter 'func' is not passed to method 'inject'");
      }
      var i,
          parameters = [],
          context = { resolving: [] };
      if (func instanceof Array) {
        if (func.length === 0) {
          throw new di.DependencyResolverException("The array passed to the method 'inject' can't be empty");
        }
        for (i = 0; i < func.length - 1; i++) {
          parameters.push(func[i]);
        }
        func = func[func.length - 1];
        if (typeof func !== 'function') {
          throw new di.DependencyResolverException("The last item of the array passed to the method 'inject' has " +
            "to be a 'function'");
        }
        for (i = 0; i < parameters.length; i++) {
          if (typeof parameters[i] === 'string' && this.contains(parameters[i])) {
            parameters[i] = this.__resolve(parameters[i], context);
          }
        }
        func.apply(null, parameters);
      } else {
        var registration = null;
        if (arguments.length === 2 && typeof arguments[1] === 'string') {
          var name = arguments[1];
          if (!this.contains(name)) {
            throw new di.DependencyResolverException("Type with name '" + name + "' is not registered");
          }
          registration = this.getRegistration(name);
        }
        if (typeof func === 'function') {
          if (registration) {
            parameters = this.__getConstructorParameters(registration, context);
          } else {
            var args = this.__getFunctionArguments(func);
            for (i = 0; i < args.length; i++) {
              if (this.contains(args[i])) {
                parameters.push(this.__resolve(args[i], context));
              } else {
                parameters.push(null);
              }
            }
          }
          func.apply(null, parameters);
        } else if (typeof func === 'object') {
          if (registration) {
            this.__setProperties(func, registration, context);
          } else {
            for (var propertyName in func) {
              if (this.contains(propertyName)) {
                parameters.push({
                  name: propertyName,
                  value: this.__resolve(propertyName, context)
                });
              }
            }
            if (parameters.length > 0) {
              for (i = 0; i < parameters.length; i++) {
                func[parameters[i].name] = parameters[i].value;
              }
            }
          }
        } else {
          throw new di.DependencyResolverException("Invalid parameter has been passed to the method 'inject'");
        }
      }
      return this;
    },
  
    contains: function (name) {
      if (!name) {
        throw new di.DependencyResolverException("Parameter 'name' is not passed to the method 'contains'");
      }
      if (typeof name !== 'string') {
        throw new di.DependencyResolverException("Parameter 'name' passed to the  has to be a 'string'");
      }
      var has = false;
      if (this.__container) {
        if (name in this.__container) {
          has = true;
        }
      }
      if (!has && this.__parent) {
        if (!('contains' in this.__parent)) {
          throw new di.DependencyResolverException("Dependency resolver's parent doesn't have a method 'contains'");
        }
        has = this.__parent.contains(name);
      }
      return has;
    },
  
    resolve: function (name) {
      return this.__resolve(name, { resolving: [] });
    },
  
    getDefaultFactory: function () {
      var factory = null;
      if (this.__defaultFactory) {
        factory = this.__defaultFactory;
      } else if (this.__parent) {
        if (!('getDefaultFactory' in this.__parent)) {
          throw new di.DependencyResolverException("Dependency resolver's parent doesn't have a " +
            "method 'getDefaultFactory'");
        }
        factory = this.__parent.getDefaultFactory();
      } else {
        factory = new di.InstanceFactory();
      }
      return factory;
    },
  
    setDefaultFactory: function (factory) {
      if (!factory) {
        throw new di.DependencyResolverException("Parameter 'factory' is not passed to the method " +
          "'setDefaultFactory");
      }
      if (typeof factory !== 'function' && typeof factory !== 'object') {
        throw new di.DependencyResolverException("Parameter 'factory' passed to the method 'setDefaultFactory' has " +
          " to be a 'function' or 'object'");
      }
      if (typeof factory === 'object' && !('create' in factory)) {
        throw new di.DependencyResolverException("Factory's instance passed to the method 'setDefaultFactory' has " +
          "to have a method 'create'");
      }
      this.__defaultFactory = factory;
      return this;
    },
  
    getNameTransformer: function () {
      var transformer = null;
      if (this.__nameTransformer) {
        transformer = this.__nameTransformer;
      } else if (this.__parent) {
        if (!('getNameTransformer' in this.__parent)) {
          throw new di.DependencyResolverException("Dependency resolver's parent doesn't have a " +
            "method 'getNameTransformer'");
        }
        transformer = this.__parent.getNameTransformer();
      } else {
        transformer = new di.NameTransformer();
      }
      return transformer;
    },
  
    setNameTransformer: function (transformer) {
      if (!transformer) {
        throw new di.DependencyResolverException("Parameter 'transformer' is not passed to the method " +
          "'setNameTransformer'");
      }
      if (typeof transformer !== 'function' && typeof transformer !== 'object') {
        throw new di.DependencyResolverException("Parameter 'transformer' passed to the method 'setNameTransformer' " +
          "has to be a 'function' or 'object'");
      }
      if (typeof transformer === 'object' && !('transform' in transformer)) {
        throw new di.DependencyResolverException("Trabsformers's instance passed to the method 'setNameTransformer' " +
          "has to have a method 'transform'");
      }
      this.__nameTransformer = transformer;
      return this;
    },
  
    getRegistration: function (name) {
      var registration = null;
      if (this.__container && name in this.__container) {
        registration = this.__container[name];
      } else if (this.__parent) {
        if (!('getRegistration' in this.__parent)) {
          throw new di.DependencyResolverException("Dependency resolver's parent doesn't have a " +
            "method 'getRegistration'");
        }
        registration = this.parent.getRegistration();
      }
      return registration;
    },
  
    dispose: function () {
      var registration = null;
      if (this.__container) {
        for (var name in this.__container) {
          registration = this.__container[name];
          if (registration.instance && ('dispose' in registration.instance)) {
            registration.instance.dispose();
          }
          registration.instance = null;
          registration.factory = null;
        }
      }
      this.__parent = null;
      this.__defaultFactory = null;
      this.__nameTransformer = null;
      this.__autowired = false;
      this.__container = null;
      this.__registration = null;
      this.__withProperties = false;
      this.__withConstructor = false;
      this.__parameter = null;
      this.__property = null;
    },
  
    toString: function () {
      return '[object di.DependencyResolver]';
    },
  
    __getFunctionArguments: function (func) {
        if (func && typeof func === 'function' && 'toString' in func) {
          var str = null;
          var result = func
            .toString()
            .match(/^[\s\(]*function[^(]*\(([^)]*)\)/);
          if (result && result.length > 1) {
            str = result[1]
              .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
              .replace(/\s+/g, '');
          }
          if (str) {
            return str.split(',');
          }
        }
        return [];
      },
  
    __resolve: function (name, context) {
      if (!name) {
        throw new di.DependencyResolverException("Parameter 'name' is not passed to the method 'resolve'");
      }
      if (typeof name !== 'string') {
        throw new di.DependencyResolverException("Parameter 'name' passed to the method 'resolve' has to be " +
          "a 'string'");
      }
      if (!this.contains(name)) {
        throw new di.DependencyResolverException("Type or instance with name '" + name + "' is not registered");
      }
      var index = context.resolving.indexOf(name);
      if (index !== -1) {
        throw new di.DependencyResolverException("Can not resolve circular dependency '" + name + "'");
      }
      context.resolving.push(name);
      var i,
          instance = null,
          registration = this.getRegistration(name);
      if (registration.instance !== null && registration.instance !== undefined) {
        instance = registration.instance;
      } else {
        instance = this.__createInstance(registration, context);
        this.__setProperties(instance, registration, context);
        if (instance && registration.singleton) {
          registration.instance = instance;
        }
        if (!instance) {
          throw new di.DependencyResolverException("Failed to resolve instance by name '" + name + "'");
        }
      }
      index = context.resolving.indexOf(name);
      if (index > -1) {
        context.resolving.splice(index, 1);
      }
      return instance;
    },
  
    __resolveDependencyName: function (name) {
      var transform = this.getNameTransformer();
      if (typeof transform === 'function') {
        name = transform(name);
      } else {
        name = transform.transform(name);
      }
      if (!name) {
        throw di.DependencyResolverException("Failed to resolve dependency name");
      }
      return name;
    },
  
    __createInstance: function (registration, context) {
      var i,
          instance;
      var parameters = this.__getConstructorParameters(registration, context);
      var options = new di.InstanceFactoryOptions({
        name: registration.name,
        type: registration.type,
        parameters: parameters
      });
      var factory = null;
      if (registration.factory) {
        factory = registration.factory;
      } else {
        factory = this.getDefaultFactory();
      }
      if (factory) {
        if (typeof factory === 'function') {
          instance = factory.call(null, options);
        } else {
          instance = factory.create(options);
        }
      } else {
        throw new di.DependencyResolverException("Default factory is not defined");
      }
      return instance;
    },
  
    __getConstructorParameters: function (registration, context) {
      var parameters = [];
      if (registration && registration.dependencies) {
        var i,
            parameter,
            value,
            args,
            index;
        if (this.__autowired) {
          args = this.__getFunctionArguments(registration.type);
          var dependencyName;
          for (i = 0; i < args.length; i++) {
            dependencyName = this.__resolveDependencyName(args[i]);
            if (this.contains(dependencyName)) {
              parameters.push(this.__resolve(dependencyName, context));
            } else {
              parameters.push(null);
            }
          }
        }
        for (i = 0; i < registration.dependencies.parameters.length; i++) {
          parameter = registration.dependencies.parameters[i];
          if (parameter.value !== undefined) {
            value = parameter.value;
          } else if (parameter.reference !== undefined) {
            value = this.__resolve(parameter.reference, context);
          } else {
            value = null;
          }
          if (parameter.index !== undefined && parameter.index !== null) {
            parameters[parameter.index] = value;
          } else if (parameter.name) {
            if (!args) {
              args = this.__getFunctionArguments(registration.type);
            }
            index = args.indexOf(parameter.name);
            if (index === -1) {
              throw di.DependencyResolverException("Constructor in registration '" + registration.name +
                "' doesn't have defined parameter '" + parameter.name + "'");
            }
            parameters[index] = value;
          } else {
            parameters.push(value);
          }
        }
      }
      return parameters;
    },
  
    __hasProperty: function (registration, name) {
      var has = false;
      if (registration.dependencies) {
        var property;
        for (var i = 0; i < registration.dependencies.properties.length; i++) {
          property = registration.dependencies.properties[i];
          if (property.name === name) {
            has = true;
            break;
          }
        }
      }
      return has;
    },
  
    __setProperties: function (instance, registration, context) {
      if (registration.dependencies) {
        if (this.__autowired) {
          for (var propertyName in instance) {
            var dependency = this.__resolveDependencyName(propertyName);
            if (!this.__hasProperty(propertyName) && this.contains(dependency)) {
              instance[propertyName] = this.__resolve(dependency, context);
            }
          }
        }
        for (var i = 0; i < registration.dependencies.properties.length; i++) {
          var property = registration.dependencies.properties[i];
          if (property.value !== undefined) {
            instance[property.name] = property.value;
          } else if (property.reference !== undefined) {
            instance[property.name] = this.__resolve(property.reference, context);
          }
        }
      }
    }
  
  };
  
  Object.defineProperty(di.DependencyResolver.prototype, '__getConstructorParameters', { enumerable: false });
  Object.defineProperty(di.DependencyResolver.prototype, '__getFunctionArguments', { enumerable: false });
  Object.defineProperty(di.DependencyResolver.prototype, '__resolveDependencyName', { enumerable: false });
  Object.defineProperty(di.DependencyResolver.prototype, '__createInstance', { enumerable: false });
  Object.defineProperty(di.DependencyResolver.prototype, '__hasProperty', { enumerable: false });
  Object.defineProperty(di.DependencyResolver.prototype, '__setProperties', { enumerable: false });
  
  Object.seal(di.DependencyResolver);
  Object.seal(di.DependencyResolver.prototype);

  di.__defaultDependencyResolver = new di.DependencyResolver();
  
  di.autowired = function (value) {
    return di.__defaultDependencyResolver.autowired(value);
  };
  
  di.register = function (name) {
    return di.__defaultDependencyResolver.register(name);
  };
  
  di.as = function (type) {
    return di.__defaultDependencyResolver.as(type);
  };
  
  di.instance = function (instance) {
    return di.__defaultDependencyResolver.instance(instance);
  };
  
  di.asSingleton = function () {
    return di.__defaultDependencyResolver.asSingleton();
  };
  
  di.withConstructor = function () {
    return di.__defaultDependencyResolver.withConstructor();
  };
  
  di.param = function (name) {
    return di.__defaultDependencyResolver.param(name);
  };
  
  di.withProperties = function (name) {
    return di.__defaultDependencyResolver.withProperties();
  };
  
  di.prop = function (name) {
    return di.__defaultDependencyResolver.prop(name);
  };
  
  di.val = function (instance) {
    return di.__defaultDependencyResolver.val(instance);
  };
  
  di.ref = function (name) {
    return di.__defaultDependencyResolver.ref(name);
  };
  
  di.setFactory = function (factory) {
    return di.__defaultDependencyResolver.setFactory(factory);
  };
  
  di.create = function () {
    return di.__defaultDependencyResolver.create();
  };
  
  di.inject = function (func, name) {
    return di.__defaultDependencyResolver.inject(func, name);
  };
  
  di.contains = function (name) {
    return di.__defaultDependencyResolver.contains(name);
  };
  
  di.resolve = function (name) {
    return di.__defaultDependencyResolver.resolve(name);
  };
  
  di.getDefaultFactory = function () {
    return di.__defaultDependencyResolver.getDefaultFactory();
  };
  
  di.setDefaultFactory = function (factory) {
    return di.__defaultDependencyResolver.setDefaultFactory(factory);
  };
  
  di.getNameTransformer = function () {
    return di.__defaultDependencyResolver.getNameTransformer();
  };
  
  di.setNameTransformer = function (transformer) {
    return di.__defaultDependencyResolver.setNameTransformer(transformer);
  };
  
  di.getRegistration = function (name) {
    return di.__defaultDependencyResolver.getRegistration(name);
  };
  
  di.dispose = function () {
    return di.__defaultDependencyResolver.dispose();
  };
  
  Object.defineProperty(di, '__defaultDependencyResolver', { enumerable: false });

  Object.freeze(di);

  return di;

} ());