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