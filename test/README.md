# Tests

## Running tests

Tests can be run through the test running script: `npm test`.

View its options with: `npm test -- --help`.

Options are default on or off depending on whether they need a specific environment setup to run. E.g. the e2e tests don't run by default because you need to run a rari and fred server.

### Examples

To run only unit tests:

```
npm test -- --lint false
```

To run e2e tests against already running fred and rari servers:

```
npm test -- --e2e
```

To only run e2e tests and bring up a fred dev server and rari server:

```
npm test -- --lint false --unit false --e2e --fred dev --rari
```

## Visual tests

Some of our tests do a visual diff. These require a baseline to compare against. Generate this with:

```
npm run test -- --lint false --unit false --e2e --update-visual-baseline
```

Then make your changes and compare:

```
npm run test -- --lint false --unit false --e2e
```

And generate a report to visualise the changes:

```
npm run test:visual-report -- generate --serve
```

### Running in CI

Visual tests are run in CI. First we checkout and build the base branch of the PR and build fred. Then we checkout the head of the PR and run the tests against the base build to generate the baseline. Finally we build fred from the head and run the tests again to compare.

We do this to ensure that if any tests are added or changed in the PR they are also run against the base branch.

The tests generate an artifact containing the diff report. To view it download it, unzip it, and start a server in the folder, like so:

```
npx http-server
```
