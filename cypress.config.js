const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com/",
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    supportFile: 'cypress/support/e2e.js',
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
