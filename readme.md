# Google Cloud Datastore Sessions

``cloud-datastore-session`` is a Express session storage backed by [Google Cloud Datastore](https://cloud.google.com/datastore/docs).

**Note:** Cloud Datastore is a persistent, distributed, transactional database. Often, it's more appropriate to choose a different storage solution for sessions such as Memcache or Redis as their designs offer much faster operation in this use case.

## Installation

    $ npm install --save cloud-datastore-session

## Configuration

You must have a Google Cloud project and credentials. See [gcloud node's documentation](https://github.com/GoogleCloudPlatform/gcloud-node#authorization) on setting up authorization.

## Usage Example

```javascript
var express = require('express');
var session = require('express-session');
var app = express();

var DatastoreStore = require('cloud-datastore-session')(session);

app.use(session({
  store: new DatastoreStore({
    dataset: gcloud.datastore.dataset({
        prefix: 'express-sessions',
        projectId: 'my-project-id',
        keyFilename: './key.json'
    }))
  }),
  secret: 'my-secret'
}));
```

## Contributing changes

* See [CONTRIB.md](CONTRIB.md)


## Licensing

* Apache 2.0 - See [LICENSE](LICENSE)
