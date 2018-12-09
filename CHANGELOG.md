##### 1.0.0 - 09 January 2017

###### Breaking changes

- Changed dependency on `gcloud` to peer dependency on `@google-cloud/datastore`
- Rename package to `@google-cloud/connect-datastore`

###### Other

- Update code style and switch to using Semistandard for linting
- Added `yarn.lock` file
- Updated licensing, authors, contributors, readme
## v0.1.0

12-09-2018 12:09 PST

### Features & Fixes
- feat: Changed 'prefix' to 'kind' and added functionality to change datastore kind ([#56](https://github.com/googleapis/nodejs-datastore-session/pull/56))
- fix: update all dependencies and remove lock files ([#18](https://github.com/googleapis/nodejs-datastore-session/pull/18))

### Documentation
- docs: clean up readme ([#25](https://github.com/googleapis/nodejs-datastore-session/pull/25))

### Internal / Testing Changes
- chore: always nyc report before calling codecov ([#54](https://github.com/googleapis/nodejs-datastore-session/pull/54))
- chore: nyc ignore build/test by default ([#53](https://github.com/googleapis/nodejs-datastore-session/pull/53))
- chore: update license file ([#51](https://github.com/googleapis/nodejs-datastore-session/pull/51))
- fix(build): fix system key decryption ([#47](https://github.com/googleapis/nodejs-datastore-session/pull/47))
- chore: add a synth.metadata
- chore: update eslintignore config ([#43](https://github.com/googleapis/nodejs-datastore-session/pull/43))
- chore: drop contributors from multiple places ([#42](https://github.com/googleapis/nodejs-datastore-session/pull/42))
- chore: use latest npm on Windows ([#41](https://github.com/googleapis/nodejs-datastore-session/pull/41))
- chore: update CircleCI config ([#40](https://github.com/googleapis/nodejs-datastore-session/pull/40))
- chore: include build in eslintignore ([#37](https://github.com/googleapis/nodejs-datastore-session/pull/37))
- chore(deps): update dependency eslint-plugin-node to v8 ([#33](https://github.com/googleapis/nodejs-datastore-session/pull/33))
- build: add key for auth in CI ([#32](https://github.com/googleapis/nodejs-datastore-session/pull/32))
- chore: update issue templates ([#31](https://github.com/googleapis/nodejs-datastore-session/pull/31))
- chore: remove old issue template ([#29](https://github.com/googleapis/nodejs-datastore-session/pull/29))
- build: run tests on node11 ([#28](https://github.com/googleapis/nodejs-datastore-session/pull/28))
- chore(build): update build config and issue templates ([#27](https://github.com/googleapis/nodejs-datastore-session/pull/27))
- chore: use es6 features ([#26](https://github.com/googleapis/nodejs-datastore-session/pull/26))
- chore(deps): update dependency @google-cloud/datastore to v2 ([#20](https://github.com/googleapis/nodejs-datastore-session/pull/20))
- chore(build): get the build passing ([#24](https://github.com/googleapis/nodejs-datastore-session/pull/24))
- chore: drop support for node.js <  6.x ([#23](https://github.com/googleapis/nodejs-datastore-session/pull/23))
- chore(build): update to a modern configuration ([#22](https://github.com/googleapis/nodejs-datastore-session/pull/22))
- chore(build): add synth file and generate ([#21](https://github.com/googleapis/nodejs-datastore-session/pull/21))
- Add renovate.json ([#13](https://github.com/googleapis/nodejs-datastore-session/pull/13))

