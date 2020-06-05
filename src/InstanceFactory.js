var InstanceFactory = function () {
  Object.seal(this);
};

InstanceFactory.prototype = Object.create(Object.prototype, {

  create: {
    value: function (options) {
      if (!options) {
        throw new DependencyResolverException("Parameter 'options' is not set");
      }
      if ('type' in options && !options.type) {
        throw new DependencyResolverException("Factory can't create object, because type is not set");
      }
      if (typeof options.type !== 'function') {
        throw new DependencyResolverException("Factory can't create object, because given type is not a function");
      }
      if (options.type === Number || options.type === Date || options.type === Boolean || options.type === String ||
        options.type === Array || options.type === Function || options.type === RegExp) {
        throw new DependencyResolverException("Basic type can not be instantiated using a factory");
      }
      var Type = options.type;
      if (options.parameters && options.parameters.length > 0) {
        type = function () {
          return options.type.apply(this, options.parameters);
        };
        type.prototype = Object.create(options.type.prototype);
      }
      return new Type();
    },
    enumerable: true
  },

  toString: {
    value: function () {
      return '[object InstanceFactory]';
    },
    enumerable: true
  }

});

Object.seal(InstanceFactory);
Object.seal(InstanceFactory.prototype);

exports.InstanceFactory = InstanceFactory;