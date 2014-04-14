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