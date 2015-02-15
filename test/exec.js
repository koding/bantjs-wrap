var wrap = require('..');
var test = require('tape');
var vm = require('vm');
var concat = require('concat-stream');

test('exec', function (t) {
  t.plan(2);
  wrap({
    main: 'quux'
  }, { exec: true }).pipe(concat(function (src) {
    var cache = {
      quux: function () {
        t.ok(1);
        return 'qux';
      }
    }, _exports;

    var ctx = {
      module: { exports: _exports },
      require: function (s) { return cache[s]; }
    };

    vm.runInNewContext(src, ctx);
    t.equal(ctx.module.exports, 'qux');
    t.end();
  }));
});