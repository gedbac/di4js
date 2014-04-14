di.DependencyResolverException = function (message) {
  this.__name = 'DependencyResolverException';
  this.__stack = null;
  this.__message = message || "A dependency resolver exception has occurred.";
  var lines, i, tmp;
  if ((typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Chrome') !== -1) ||
    (typeof navigator === 'undefined')) {
    lines = new Error().stack.split('\n');
    if (lines && lines.length > 2) {
      tmp = [];
      for (i = 2; i < lines.length; i++) {
        if (lines[i]) {
          tmp.push(lines[i].trim());
        }
      }
      this.stack = tmp.join('\n');
    }
  } else if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') !== -1) {
    lines = new Error().stack.split('\n');
    if (lines && lines.length > 1) {
      tmp = [];
      for (i = 1; i < lines.length; i++) {
        if (lines[i]) {
          tmp.push('at ' + lines[i].trim().replace('@', ' (') + ')');
        }
      }
      this.stack = tmp.join('\n');
    }
  } else if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Trident') !== -1) {
    try {
      throw new Error();
    } catch (error) {
      if ('stack' in error) {
        lines = error.stack.split('\n');
        if (lines && lines.length > 2) {
          tmp = [];
          for (i = 2; i < lines.length; i++) {
            if (lines[i]) {
              tmp.push(lines[i].trim());
            }
          }
          this.stack = tmp.join('\n');
        }
      } else {
        this.stack = '';
      }
    }
  } else {
    var error = new Error();
    if ('stack' in error) {
      this.stack = error.stack;
    } else {
      this.stack = '';
    }
  }
  Object.defineProperty(this, '__name', { enumerable: false });
  Object.defineProperty(this, '__message', { enumerable: false });
  Object.defineProperty(this, '__stack', { enumerable: false });
  Object.seal(this);
};

di.DependencyResolverException.prototype = {

  get name() {
    return this.__name;
  },

  set name(value) {
    this.__name = value;
  },

  get message() {
    return this.__message;
  },

  set message(value) {
    this.__message = value;
  },

  get stack() {
    return this.__stack;
  },

  set stack(value) {
    this.__stack = value;
  },

  toString: function () {
    var msg = this.name + ': ' + this.message;
    if (this.stack) {
      msg += '\n\t' + this.stack.replace(/\n/g, '\n\t');
    }
    return msg;
  }

};

Object.seal(di.DependencyResolverException);
Object.seal(di.DependencyResolverException.prototype);