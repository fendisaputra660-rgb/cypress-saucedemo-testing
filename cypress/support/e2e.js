afterEach(function () {
  if (this.currentTest.state === 'passed') {
    const testName = this.currentTest.title
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();

    cy.screenshot(`PASS_${testName}`);
  }

  if (this.currentTest.state === 'failed') {
    const testName = this.currentTest.title
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();

    cy.screenshot(`FAIL_${testName}`);
  }
});
