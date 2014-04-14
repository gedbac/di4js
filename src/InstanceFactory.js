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