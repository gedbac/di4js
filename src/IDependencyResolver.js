var IDependencyResolver = Object.create(Object.prototype, {

  isAutowired: {
    get: function () {},
    enumerable: true
  },

  autowired: {
    value: function (value) {},
    enumerable: true
  },

  register: {
    value: function (name) {},
    enumerable: true
  },

  as: {
    value: function (type) {},
    enumerable: true
  },

  instance: {
    value: function (instance) {},
    enumerable: true
  },

  asSingleton: {
    value: function () {},
    enumerable: true
  },

  withConstructor: {
    value: function () {},
    enumerable: true
  },

  param: {
    value: function (name) {},
    enumerable: true
  },

  withProperties: {
    value: function (name) {},
    enumerable: true
  },

  prop: {
    value: function (name) {},
    enumerable: true
  },

  val: {
    value: function (instance) {},
    enumerable: true
  },

  ref: {
    value: function (name) {},
    enumerable: true
  },

  setFactory: {
    value: function (factory) {},
    enumerable: true
  },

  create: {
    value: function () {},
    enumerable: true
  },

  inject: {
    value: function (func, name) {},
    enumerable: true
  },

  contains: {
    value: function (name) {},
    enumerable: true
  },

  resolve: {
    value: function (name) {},
    enumerable: true
  },

  getDefaultFactory: {
    value: function () {},
    enumerable: true
  },

  setDefaultFactory: {
    value: function (factory) {},
    enumerable: true
  },

  getNameTransformer: {
    value: function () {},
    enumerable: true
  },

  setNameTransformer: {
    value: function (transformer) {},
    enumerable: true
  },

  getRegistration: {
    value: function (name) {},
    enumerable: true
  },

  dispose: {
    value: function () {},
    enumerable: true
  },

  toString: {
    value: function () {
      return '[object IDependencyResolver]';
    },
    enumerable: true
  }

});

Object.freeze(IDependencyResolver);

exports.IDependencyResolver = IDependencyResolver;