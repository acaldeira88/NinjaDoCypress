describe("iframe", () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Video").click();
  });

  it("Deve poder tocar o video de exemplo", () => {
    
    cy.wait(3000);

    cy.get('iframe[title="Video Player"]')
      .should("exist")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .as("iFramePlayer");

    cy.get("@iFramePlayer").find(".play-button").click();

    cy.get("@iFramePlayer").find(".pause-button").should("be.visible");
  });
});
