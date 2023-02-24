# My Cypress
Sandbox for working with Cypress.

## Usage
To run this example:

Using the Cypress [Launchpad](https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad):
```
npx cypress open
```

Automation:
```
npm run test
```

Script to run 3-my-tests:
```
./run-my.sh [--spec /to/path]
```
The script will remove previous results first.

Ternimal:
```
npx cypress run [--spec /to/path] [--headed]
```

## Testspace

Publish:

```
testspace cypress/results/*.xml{cypress/e2e}
```

Configuration via console:
```
testspace config url https:TOKEN@stridespace.com
testspace config project munderseth:my.cypress
testspace config space main
```

## Setup
The following steps required to setup frome scratch.

`.gitignore`
```
node_modules
cypress/screenshots
cypress/videos
cypress/results
logs
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

Terminal output:
```
npm i --save-dev cypress-terminal-report
```

### Configuration
The `cpyress.config.js` specifics:

- Configure built-in *moacha reporter* to use the `[hash]` to generate unique report for each file executed.
- The *cypress-terminal-report* requires settings
- The */cypress/support/e2e.js* requires updates


## References

- https://github.com/michaelleeallen/mocha-junit-reporter
- https://github.com/archfz/cypress-terminal-report - Terminal output plugin
  - https://github.com/archfz/cypress-terminal-report - demo
- Issue tracking concerning terminal output
  - https://github.com/cypress-io/cypress/issues/8823
  - https://github.com/cypress-io/cypress/issues/448 - issue tracking
  - https://github.com/flotwig/cypress-log-to-output/issues/22 - outdated