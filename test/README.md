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

## Visual tests

Visual tests live in `test/specs/*.visual.js` and are run separately from e2e tests. They require a baseline to compare against. Generate this with:

```
npm run test -- visual --update-baseline
```

Then make your changes and compare:

```
npm run test -- visual
```

And generate a report to visualise the changes:

```
npm run test -- visual-report generate --serve
```

### Running in CI

Visual tests are run in CI as a separate step from e2e tests. Visual failures are informational, they don't block a PR. First we checkout and build the base branch of the PR. Then we checkout the head of the PR and run the visual tests against the base build to generate the baseline. Finally we build fred from the head and run the visual tests again to compare.

We do this to ensure that if any tests are added or changed in the PR they are also run against the base branch.

The tests generate an artifact containing the diff report. To view it download it, unzip it, and start a server in the folder, like so:

```
npx http-server
```
