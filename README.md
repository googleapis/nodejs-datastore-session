<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Inc. logo" title="Google" align="right" height="96" width="96"/>

# Google Cloud Datastore Sessions

[![NPM][1]][2]
[![Tests][3]][4]
[![Coverage][5]][6]

[1]: https://img.shields.io/npm/v/@google-cloud/connect-datastore.svg?style=flat
[2]: https://www.npmjs.org/package/@google-cloud/connect-datastore
[3]: https://img.shields.io/circleci/project/GoogleCloudPlatform/cloud-datastore-session-node/master.svg
[4]: https://circleci.com/gh/GoogleCloudPlatform/cloud-datastore-session-node
[5]: https://img.shields.io/codecov/c/github/GoogleCloudPlatform/cloud-datastore-session-node/master.svg
[6]: https://codecov.io/github/GoogleCloudPlatform/cloud-datastore-session-node

**@google-cloud/connect-datastore** is a [Google Cloud Datastore][datastore]
session store backed by [@google-cloud/datastore][datastore_lib].

**Note:** Cloud Datastore is a persistent, distributed, transactional database.
Often, it's more appropriate to choose a different storage solution for sessions
such as Memcache or Redis as their designs offer much faster operation in this
use case.

## Installation

    npm install --save @google-cloud/connect-datastore

or

    yarn add @google-cloud/connect-datastore

## Configuration

You must have a Google Cloud project and credentials.

See [gcloud node's documentation][auth] on setting up authentication.

## Usage Example

```javascript
var Datastore = require('@google-cloud/datastore');

var express = require('express');
var session = require('express-session');
var app = express();

var DatastoreStore = require('@google-cloud/connect-datastore')(session);

app.use(session({
  store: new DatastoreStore({
    dataset: Datastore({
      prefix: 'express-sessions',

      // For convenience, @google-cloud/datastore automatically looks for the
      // GCLOUD_PROJECT environment variable. Or you can explicitly pass in a
      // project ID here:
      projectId: 'YOUR_PROJECT_ID' || process.env.GCLOUD_PROJECT,

      // For convenience, @google-cloud/datastore automatically looks for the
      // GOOGLE_APPLICATION_CREDENTIALS environment variable. Or you can
      // explicitly pass in that path to your key file here:
      keyFilename: '/path/to/keyfile.json' || process.env.GOOGLE_APPLICATION_CREDENTIALS
    })
  }),
  secret: 'my-secret'
}));
```

## Contributing

* See [CONTRIBUTING.md](.github/CONTRIBUTING.md)

## License

* Apache 2.0 - See [LICENSE](LICENSE)

[express]: http://expressjs.com/
[datastore]: https://cloud.google.com/datastore/docs
[datastore_lib]: https://www.npmjs.com/package/@google-cloud/datastore
[auth]: https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/latest/guides/authentication
