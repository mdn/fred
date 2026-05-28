# Tests

## Running tests

Tests can be run through the test running script: `npm test -- <command>`.

View available commands with: `npm test -- --help`.

### Examples

To run unit tests:

```
npm test -- unit
```

To run e2e tests against already running fred and rari servers:

```
npm test -- e2e
```

To run e2e tests and bring up a fred dev server and rari server:

```
npm test -- e2e --fred dev --rari
```
