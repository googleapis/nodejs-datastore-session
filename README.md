<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Inc. logo" title="Google" align="right" height="96" width="96"/>

# Google Cloud Datastore Sessions

[![NPM][1]][2]

[1]: https://img.shields.io/npm/v/@google-cloud/connect-datastore.svg?style=flat
[2]: https://www.npmjs.org/package/@google-cloud/connect-datastore

**@google-cloud/connect-datastore** is a [Google Cloud Datastore][datastore]
session store backed by [@google-cloud/datastore][datastore_lib].

**Note:** Cloud Datastore is a persistent, distributed, transactional database.
Often, it's more appropriate to choose a different storage solution for sessions
such as Memcache or Redis as their designs offer much faster operation in this
use case.

## Installation

    npm install @google-cloud/connect-datastore

## Configuration

You must have a Google Cloud project and credentials.

See [gcloud node's documentation][auth] on setting up authentication.

## Usage Example

```javascript
const {Datastore} = require('@google-cloud/datastore');
const express = require('express');
const session = require('express-session');
const app = express();

const DatastoreStore = require('@google-cloud/connect-datastore')(session);

app.use(session({
  store: new DatastoreStore({
    kind: 'express-sessions',

    // Optional: expire the session after this many milliseconds.
    // note: datastore does not automatically delete all expired sessions
    // you may want to run separate cleanup requests to remove expired sessions
    // 0 means do not expire
    expirationMs: 0,

    dataset: new Datastore({

      // For convenience, @google-cloud/datastore automatically looks for the
      // GCLOUD_PROJECT environment variable. Or you can explicitly pass in a
      // project ID here:
      projectId: process.env.GCLOUD_PROJECT,

      // For convenience, @google-cloud/datastore automatically looks for the
      // GOOGLE_APPLICATION_CREDENTIALS environment variable. Or you can
      // explicitly pass in that path to your key file here:
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    })
  }),
  secret: 'my-secret'
}));
```

## Expiration
If a session is fetched with the delta between the createdAt time and current
time greater than expirationMs, the session will not be returned and will
instead be destroyed.

Datastore does not support a `ttl`, and tokens are only deleted if a session
is fetched. You will likely want to implement logic to occasionally delete
expired sessions.

## Contributing

* See [CONTRIBUTING.md](https://github.com/googleapis/nodejs-datastore-session/blob/master/CONTRIBUTING.md)

## License

* Apache 2.0 - See [LICENSE](https://github.com/googleapis/nodejs-datastore-session/blob/master/LICENSE)

[express]: http://expressjs.com/
[datastore]: https://cloud.google.com/datastore/docs
[datastore_lib]: https://www.npmjs.com/package/@google-cloud/datastore
[auth]: https://cloud.google.com/docs/authentication/getting-started
