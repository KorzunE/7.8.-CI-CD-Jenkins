const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "4x95wj",
  e2e: {
    baseUrl:"https://petstore.swagger.io/v2/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
