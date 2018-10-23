/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Datastore = require('@google-cloud/datastore');
const express = require('express');
const session = require('express-session');
const app = express();

const DatastoreStore = require('@google-cloud/connect-datastore')(session);

app.use(
  session({
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
        keyFilename:
          '/path/to/keyfile.json' || process.env.GOOGLE_APPLICATION_CREDENTIALS,
      }),
    }),
    secret: 'my-secret',
  })
);
