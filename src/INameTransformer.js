var INameTransformer = Object.create(Object.prototype, {

  transform: {
    value: function (name) {},
    enumerable: true
  },

  toString: {
    value: function () {
      return '[object INameTransformer]';
    },
    enumerable: true
  }

});

Object.freeze(INameTransformer);

exports.INameTransformer = INameTransformer;