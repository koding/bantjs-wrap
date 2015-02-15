var wrap = require('..');
var test = require('tape');
var concat = require('concat-stream');

test('fullpaths', function (t) {
  wrap({
    main: './x.js',
    basedir: __dirname + '/basedir'
  }, { fullPaths: true }).pipe(concat(function (src) {
    t.ok(new RegExp(__dirname + '/basedir/x.js').test(src));
    t.end();
  }));
});