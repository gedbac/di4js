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