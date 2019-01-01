const { describe, it } = require('mocha');
const assume = require('assume');
const poison = require('./');

describe('require-poisoning', function () {
  it('is a function', function () {
    assume(poison).is.a('function');
  });

  it('overriddes an existing require', function () {
    poison('mocha', {
      exports: 'faked'
    });

    assume(require('mocha')).equals('faked');
  });

  it('undo/redo the cache poisoning', function () {
    const undo = poison('assume', {
      exports: 'does not exist'
    });

    assume(require('assume')).equals('does not exist');

    const redo = undo();
    assume(require('assume')).equals(assume);

    const undone = redo();
    assume(require('assume')).equals('does not exist');

    assume(undone()).is.a('function');
    assume(require('assume')).equals(assume);
  });
});
