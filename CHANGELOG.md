##### 1.0.0 - 09 January 2017

###### Breaking changes

- Changed dependency on `gcloud` to peer dependency on `@google-cloud/datastore`
- Rename package to `@google-cloud/connect-datastore`

###### Other

- Update code style and switch to using Semistandard for linting
- Added `yarn.lock` file
- Updated licensing, authors, contributors, readme
## v2.0.2

02-15-2019 23:34 PST

### Dependencies
- fix(deps): update dependency @google-cloud/datastore to v3 ([#70](https://github.com/googleapis/nodejs-datastore-session/pull/70))

### Documentation
- docs: fix quickstart code for 3.0 ([#83](https://github.com/googleapis/nodejs-datastore-session/pull/83))
- docs: update links in contrib guide ([#80](https://github.com/googleapis/nodejs-datastore-session/pull/80))
- docs: update contributing path in README ([#76](https://github.com/googleapis/nodejs-datastore-session/pull/76))
- docs: move CONTRIBUTING.md to root ([#75](https://github.com/googleapis/nodejs-datastore-session/pull/75))
- docs: add lint/fix example to contributing guide ([#73](https://github.com/googleapis/nodejs-datastore-session/pull/73))

### Internal / Testing Changes
- build: use linkinator for docs test ([#79](https://github.com/googleapis/nodejs-datastore-session/pull/79))
- build: create docs test npm scripts ([#78](https://github.com/googleapis/nodejs-datastore-session/pull/78))
- build: test using @grpc/grpc-js in CI ([#77](https://github.com/googleapis/nodejs-datastore-session/pull/77))
- chore(deps): update dependency eslint-config-prettier to v4 ([#72](https://github.com/googleapis/nodejs-datastore-session/pull/72))
- build: ignore googleapis.com in doc link check ([#71](https://github.com/googleapis/nodejs-datastore-session/pull/71))

## v2.0.1

12-11-2018 21:18 PST

### Internal / Testing Changes
- chore(build): inject yoshi automation key ([#66](https://github.com/googleapis/nodejs-datastore-session/pull/66))
- chore: update nyc and eslint configs ([#65](https://github.com/googleapis/nodejs-datastore-session/pull/65))
- chore: fix publish.sh permission +x ([#62](https://github.com/googleapis/nodejs-datastore-session/pull/62))

## v2.0.0

12-10-2018 15:18 PST

### Implementation Changes
- feat: Changed 'prefix' to 'kind' and added functionality to change datastore kind ([#56](https://github.com/googleapis/nodejs-datastore-session/pull/56))
- fix: update all dependencies and remove lock files ([#18](https://github.com/googleapis/nodejs-datastore-session/pull/18))

### Documentation
- docs: clean up readme ([#25](https://github.com/googleapis/nodejs-datastore-session/pull/25))

### Internal / Testing Changes
- build: add Kokoro configs for autorelease ([#59](https://github.com/googleapis/nodejs-datastore-session/pull/59))
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

