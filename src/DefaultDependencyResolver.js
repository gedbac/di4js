var __defaultDependencyResolver = new DependencyResolver();

exports.getDefaultDependencyResolver = function () {
  return __defaultDependencyResolver;
};

exports.setDefaultDependencyResolver = function (value) {
  __defaultDependencyResolver = value;
};

exports.autowired = function (value) {
  return __defaultDependencyResolver.autowired(value);
};

exports.register = function (name) {
  return __defaultDependencyResolver.register(name);
};

exports.as = function (type) {
  return __defaultDependencyResolver.as(type);
};

exports.instance = function (instance) {
  return __defaultDependencyResolver.instance(instance);
};

exports.asSingleton = function () {
  return __defaultDependencyResolver.asSingleton();
};

exports.withConstructor = function () {
  return __defaultDependencyResolver.withConstructor();
};

exports.param = function (name) {
  return __defaultDependencyResolver.param(name);
};

exports.withProperties = function (name) {
  return __defaultDependencyResolver.withProperties();
};

exports.prop = function (name) {
  return __defaultDependencyResolver.prop(name);
};

exports.val = function (instance) {
  return __defaultDependencyResolver.val(instance);
};

exports.ref = function (name) {
  return __defaultDependencyResolver.ref(name);
};

exports.setFactory = function (factory) {
  return __defaultDependencyResolver.setFactory(factory);
};

exports.create = function () {
  return __defaultDependencyResolver.create();
};

exports.inject = function (func, name) {
  return __defaultDependencyResolver.inject(func, name);
};

exports.contains = function (name) {
  return __defaultDependencyResolver.contains(name);
};

exports.resolve = function (name) {
  return __defaultDependencyResolver.resolve(name);
};

exports.getDefaultFactory = function () {
  return __defaultDependencyResolver.getDefaultFactory();
};

exports.setDefaultFactory = function (factory) {
  return __defaultDependencyResolver.setDefaultFactory(factory);
};

exports.getNameTransformer = function () {
  return __defaultDependencyResolver.getNameTransformer();
};

exports.setNameTransformer = function (transformer) {
  return __defaultDependencyResolver.setNameTransformer(transformer);
};

exports.getRegistration = function (name) {
  return __defaultDependencyResolver.getRegistration(name);
};

exports.dispose = function () {
  return __defaultDependencyResolver.dispose();
};