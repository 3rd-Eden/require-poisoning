/**
 * Easily poison the require.cache of Node.js so you can inject or override
 * existing modules.
 *
 * @param {String} name Name of the module to override.
 * @param {Object} options Configuration for cache poisoning
 * @returns {Function} Undo functionality, restores previous poisoned module
 * @public
 */
module.exports = function poisoning(name, options) {
  options = options || {};

  const resolved = options.resolved || require.resolve(name);
  const old = require.cache[resolved];

  //
  // Override the existing cache with our newly aquired data.
  //
  require.cache[resolved] = {
    exports: options.exports,
    filename: resolved,
    id: resolved,
    loaded: true
  };

  return function undo() {
    require.cache[resolved] = old;

    return function redo() {
      return poisoning(name, options);
    };
  };
};
