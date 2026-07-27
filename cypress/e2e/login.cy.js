describe("Login", () => {

  beforeEach(() => {
    cy.start();
  });

  it("Deve logar com sucesso", () => {
   
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .should("contain", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );
  });

  it("Não deve logar com senha inválida", () => {
 
    cy.submitLoginForm("papito@webdojo.com", "katana321");
    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("Não deve logar com email inválido", () => {
   
    cy.submitLoginForm("404@webdojo.com", "katana123");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
