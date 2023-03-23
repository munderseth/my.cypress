const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUwY2M0NWNmLTkwMTYtNGJlMS1hYzc4LTcxM2MxOGMzNGMzOS0xNjc3NzExNTkyODA0IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiNTAxYTY5YmYtNmQyZi00ZWY0LTg4MGYtYmE0YzcxNzczZmI3IiwidHlwZSI6InQifQ.hDnELswiP6-NXDI15i4swjZCbwaSgbJ_hvJ90-3XR5s',
  }
  tesults.results(results, args);
})
.catch((err) => {
  console.error(err)
})