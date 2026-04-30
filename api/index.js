// Legacy root API entrypoint wrapper.
// If a container or deployment command accidentally starts `node api/index.js`,
// this redirects to the current backend at `src/api/index.js`.

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require(path.resolve(__dirname, '../src/api/index.js'));
