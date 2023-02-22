# My Cypress
Sandbox for working with Cypress.

## Usage
To run this example:

Using the Cypress [Launchpad](https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad):
```
npx cypress open
```

Script:
```
./run.sh [--spec /to/path]
```
The script will remove previous results first.


Ternimal:
```
npx cypress run [--spec /to/path] [--headed]
```

## Setup
The following steps required to setup frome scratch.

`.gitignore`
```
node_modules
cypress/screenshots
cypress/videos
results/
```

### Packages
Create initial `package.json` file.
```
npm init -y
```
Using https://github.com/cypress-io/cypress
```
npm install cypress --save-dev
```

### Reporter
Configure built-in moacha reporter - https://mochajs.org/#reporters.

Note. Requires the use of `[hash]` to generate unique report for each file executed.

`cpyress.config.js`
```
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/results.[hash].xml',
  },
  e2e: {
    specPattern: "cypress/tests/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```

## References

- https://www.browserstack.com/guide/how-to-start-with-cypress-debugging