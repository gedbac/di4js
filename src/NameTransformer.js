var NameTransformer = function () {
  Object.seal(this);
};

NameTransformer.prototype = Object.create(Object.prototype, {

  transform: {
    value: function (name) {
      if (!name) {
        throw new DependencyResolverException("Parameter 'name' is not passed to the method 'transform'");
      }
      return name;
    },
    enumerable: true
  },

  toString: {
    value: function () {
      return '[object NameTransformer]';
    },
    enumerable: true
  }

});

Object.seal(NameTransformer);
Object.seal(NameTransformer.prototype);

exports.NameTransformer = NameTransformer;