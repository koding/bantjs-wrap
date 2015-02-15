var wrap = require('..');
var test = require('tape');
var vm = require('vm');
var concat = require('concat-stream');

test('stream', function (t) {
  wrap({
    main: 'quux'
  }).pipe(concat(function (src) {
    var cache = {
      quux: 'qux'
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