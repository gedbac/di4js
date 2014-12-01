var InstanceFactoryOptions = function (options) {
  this.__name = null;
  this.__type = null;
  this.__parameters = null;
  if (options) {
    for (var propertyName in options) {
      if (propertyName in this) {
        this[propertyName] = options[propertyName];
      } else {
        throw new DependencyResolverException("Class 'InstanceFactoryOptions' doesn't have a property '" +
          propertyName + "'");
      }
    }
  }
  Object.defineProperty(this, '__name', { enumerable: false });
  Object.defineProperty(this, '__type', { enumerable: false });
  Object.defineProperty(this, '__parameters', { enumerable: false });
  Object.seal(this);
};

InstanceFactoryOptions.prototype = Object.create(Object.prototype, {

  name: {
    get: function () {
      return this.__name;
    },
    set: function (value) {
      this.__name = value;
    },
    enumerable: true
  },

  type: {
    get: function () {
      return this.__type;
    },
    set: function (value) {
      this.__type = value;
    },
    enumerable: true
  },

  parameters: {
    get: function () {
      return this.__parameters;
    },
    set: function (value) {
      this.__parameters = value;
    },
    enumerable: true
  },

  toString: {
    value: function () {
      return '[object InstanceFactoryOptions]';
    },
    enumerable: true
  }

});

Object.seal(InstanceFactoryOptions);
Object.seal(InstanceFactoryOptions.prototype);

exports.InstanceFactoryOptions = InstanceFactoryOptions;