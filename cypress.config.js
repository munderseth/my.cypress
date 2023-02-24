const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/results.[hash].xml',
  },
  e2e: {
    // specPattern: "cypress/tests/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
