# deflea
such conversion very javascript wow.

## Run the app:
`$ npm i`

`$ npm run start`

## Connecting deflea to a local version of dogescript
To connect a working dev version of dogescript:

`npm link <PATH_TO_DOGESCRIPT>`

`npm run start`

### Loading Tests

Import all your specs by doing `npm run import:specs` after linking your build of dogescript.

e.g.:

```bash
$ npm run import:specs

> debooger@1.0.0 import:specs J:\Workspaces\deflea
> node scripts/import-specs.js --all

...........................................................................
Successfully imported 75 specs.
```

## Debugging a Test

1. When the page loads, select the test you wish to debug.
  * The *Dogescript Source* text area should load with the source code
1. Using the *Developer Tools*
  1. Find the dogescript parser under `webpack://` -> `dogescript/lib/parser.js`
  1. Set your breakpoint in the `parse` function
  1. Reload the test
