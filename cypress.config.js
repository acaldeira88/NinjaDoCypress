const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
    experimentalFastVisibility: true,
    video:true,
    baseUrl: "http://localhost:3000",
    viewportWidth: 1440,
    viewportHeight: 900,
     },
});
