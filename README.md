# require-poisoning

Cache poisoning applied to the Node.js `require` statement. All modules are
cached internally in the `require.cache` object to prevent multiple sync
read operations when modules are required multiple times. We can poison that
cache object to introduce mocks by overriding or introducing new values in
the cache. And that is exactly what this library is, a helper to poison the
cache.

# installation

The package is released in the public npm registry and can be installed using:

```
npm install --save require-poisoning
```

## Usage

A single function is returned when you require the module which accepts the
following arguments:

- `name` Name of the module that needs to be overridden
- `options` Additional configuration:
  - `resolved` Optional pre-resolved path to the module, defaults to `require.resolve`
  - `exports` The value that it needs to be overridden with.

For example, if you wish to override the `react-native` module, you would do
the following:

```js
const poison = require('require-poisoning');

poison('react-native', {
  exports: {
    AsyncStorage: require('asyncstorageapi')
  }
});
```

And you've now mocked the `react-native` module and introduced the `AsyncStorage`
export as `asyncstorageapi` module.

## License

[MIT](LICENSE)
