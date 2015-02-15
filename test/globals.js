var wrap = require('..');
var test = require('tape');
var vm = require('vm');

test('globals', function (t) {
  var src = wrap({
    main: 'quux',
    globals: {
      a: 'foo',
      b: 'bar'
    }
  }, { asString: true });

  var cache = {
    globals: {},
    quux: 'qux'
  }, _exports;

  var ctx = {
    module: { exports: _exports },
    require: function (s) { return cache[s]; }
  };

  vm.runInNewContext(src, ctx);

  t.equal(ctx.module.exports, 'qux');
  t.deepEqual(cache.globals, { a: 'foo', b: 'bar' });
  t.end();
});