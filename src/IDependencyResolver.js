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