## Error

node:internal/modules/cjs/loader:1235
  throw err;
  ^

Error: Cannot find module 'electron'
Require stack:
- C:\Users\username\AppData\Local\fiddle-core\Cache\fiddles\1e20e1eee130b8744e45610ee319fe37\main.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1232:15)
    at Module._load (node:internal/modules/cjs/loader:1062:27)
    at c._load (node:electron/js2c/node_init:2:18008)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:227:24)
    at Module.require (node:internal/modules/cjs/loader:1318:12)
    at require (node:internal/modules/helpers:136:16)
    at Object.<anonymous> (C:\Users\hp\AppData\Local\fiddle-core\Cache\fiddles\1e20e1eee130b8744e45610ee319fe37\main.js:2:32)
    at Module._compile (node:internal/modules/cjs/loader:1569:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1722:10) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'C:\\Users\\username\\AppData\\Local\\fiddle-core\\Cache\\fiddles\\1e20e1eee130b8744e45610ee319fe37\\main.js'
  ]
}

Node.js v22.14.0
