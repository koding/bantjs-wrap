var defined = require('defined');
var Readable = require('readable-stream/readable');
var path = require('path');
var xtend = require('xtend');

module.exports = function (obj, opts) {
  if (!opts) opts = {};

  var src = '',
      globalsPath = defined(opts.globalsPath, obj.globalsPath, 'globals'),
      basedir = defined(obj.basedir, opts.basedir, undefined),
      file = (basedir && opts.fullPaths) ? path.resolve(obj.basedir, obj.main) : obj.main;

  if ('object' === typeof obj.globals) {
    src += 'var a = require(\''+ globalsPath + '\');\n'
        +  'var b = ' + JSON.stringify(obj.globals) + ';\n'
        +  'Object.keys(b).forEach(function (key) { '
        +  'a[key] = b[key]; });';
  }

  src += '\nmodule.exports = require(\'' + file + '\')' 
      +  (opts.exec ? '()' : '')
      + ';\n';
  
  return (opts.asString ? src : read(src));
};

function read (src) {
  var s = Readable();
  s._read = function () {
    s.push(src);
    s.push(null);
  };
  return s;
}
