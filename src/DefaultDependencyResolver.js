var __defaultDependencyResolver = null;

Object.defineProperty(exports, 'getDefaultDependencyResolver', {
  value: function () {
    if (!__defaultDependencyResolver) {
      __defaultDependencyResolver = new DependencyResolver();
    }
    return __defaultDependencyResolver;
  },
  enumerable: true
});

Object.defineProperty(exports, 'setDefaultDependencyResolver', {
  value: function (value) {
    __defaultDependencyResolver = value;
  },
  enumerable: true
});

Object.defineProperty(exports, 'isAutowired', {
  get: function () {
    return exports
      .getDefaultDependencyResolver()
      .isAutowired;
  },
  enumerable: true
});

Object.defineProperty(exports, 'autowired', {
  value: function (value) {
    return exports
      .getDefaultDependencyResolver()
      .autowired(value);
  },
  enumerable: true
});

Object.defineProperty(exports, 'register', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .register(name);
  },
  enumerable: true
});

Object.defineProperty(exports, 'as', {
  value: function (type) {
    return exports
      .getDefaultDependencyResolver()
      .as(type);
  },
  enumerable: true
});

Object.defineProperty(exports, 'instance', {
  value: function (instance) {
    return exports
      .getDefaultDependencyResolver()
      .instance(instance);
  },
  enumerable: true
});

Object.defineProperty(exports, 'asSingleton', {
  value: function () {
    return exports
      .getDefaultDependencyResolver()
      .asSingleton();
  },
  enumerable: true
});

Object.defineProperty(exports, 'withConstructor', {
  value: function () {
    return exports
      .getDefaultDependencyResolver()
      .withConstructor();
  },
  enumerable: true
});

Object.defineProperty(exports, 'param', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .param(name);
  },
  enumerable: true
});

Object.defineProperty(exports, 'withProperties', {
  value: function () {
    return exports
      .getDefaultDependencyResolver()
      .withProperties();
  },
  enumerable: true
});

Object.defineProperty(exports, 'prop', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .prop(name);
  }
});

Object.defineProperty(exports, 'func', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .func(name);
  }
});

Object.defineProperty(exports, 'val', {
  value: function (instance) {
    return exports
      .getDefaultDependencyResolver()
      .val(instance);
  },
  enumerable: true
});

Object.defineProperty(exports, 'ref', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .ref(name);
  },
  enumerable: true
});

Object.defineProperty(exports, 'setFactory', {
  value: function (factory) {
    return exports
      .getDefaultDependencyResolver()
      .setFactory(factory);
  },
  enumerable: true
});

Object.defineProperty(exports, 'create', {
  value: function () {
    return exports
      .getDefaultDependencyResolver()
      .create();
  },
  enumerable: true
});

Object.defineProperty(exports, 'inject', {
  value: function (func, name) {
    return exports
      .getDefaultDependencyResolver()
      .inject(func, name);
  },
  enumerable: true
});

Object.defineProperty(exports, 'contains', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .contains(name);
  },
  enumerable: true
});

Object.defineProperty(exports, 'resolve', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .resolve(name);
  },
  enumerable: true
});

Object.defineProperty(exports, 'getDefaultFactory', {
  value: function () {
    return exports
      .getDefaultDependencyResolver()
      .getDefaultFactory();
  },
  enumerable: true
});

Object.defineProperty(exports, 'setDefaultFactory', {
  value: function (factory) {
    return exports
      .getDefaultDependencyResolver()
      .setDefaultFactory(factory);
  },
  enumerable: true
});

Object.defineProperty(exports, 'getNameTransformer', {
  value: function () {
    return exports
      .getDefaultDependencyResolver()
      .getNameTransformer();
  },
  enumerable: true
});

Object.defineProperty(exports, 'setNameTransformer', {
  value: function (transformer) {
    return exports
      .getDefaultDependencyResolver()
      .setNameTransformer(transformer);
  },
  enumerable: true
});

Object.defineProperty(exports, 'getRegistration', {
  value: function (name) {
    return exports
      .getDefaultDependencyResolver()
      .getRegistration(name);
  },
  enumerable: true
});

Object.defineProperty(exports, 'dispose', {
  value: function () {
    return exports
      .getDefaultDependencyResolver()
      .dispose();
  },
  enumerable: true
});