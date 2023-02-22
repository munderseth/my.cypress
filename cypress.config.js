const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/results.[hash].xml',
    // mochaFile: 'cypress/results/results.xml',
    // testCaseSwitchClassnameAndName: true,
    // toConsole: true,
  },
  e2e: {
    specPattern: "cypress/tests/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
