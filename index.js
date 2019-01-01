/**
 * Easily poison the require.cache of Node.js so you can inject or override
 * existing modules.
 *
 * @param {String} name Name of the module to override.
 * @param {Mixed} value Data it needs to poison with.
 * @returns {Function} Undo functionality, restores previous poisoned module
 * @public
 */
module.exports = function poisoning(name, value) {
  const key = require.resolve(name);
  const old = require.cache[key];

  //
  // Override the existing cache with our newly aquired data.
  //
  require.cache[key] = {
    exports: value,
    filename: key,
    loaded: true,
    id: key
  };

  return function undo() {
    require.cache[key] = old;

    return function redo() {
      return poisoning(name, value);
    };
  };
};
