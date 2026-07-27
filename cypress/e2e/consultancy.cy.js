const { channel } = require("process");

describe("Formulário de Consultoria", () => {

beforeEach(() => {
  cy.login();
  cy.goTo("Formulários", "Consultoria");
})

  it("Deve solicitar consultoria individual", () => {
    cy.get("#name").type("Fernando Papito");
    cy.get("#email").type("fernando.papito@webdojo.com");

    cy.get("#phone")
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");

    cy.get("#consultancyType").select("In Company");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .check()
      .should("be.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.get("#document")
      .type("41515055043")
      .should("have.value", "415.150.550-43");

    const discorveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discorveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    cy.get('input[type="file"]').selectFile("./cypress/fixtures/document.pdf", {
      force: true,
    });

    cy.get("#details").type("teste campo texto");

    const technologies = [
      "Cypress",
      "Playwright",
      "selenium",
      "Robot Framework",
      "Cucumber",
    ];

    technologies.forEach((technologies) => {
      cy.get("#technologies").type(technologies).type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", technologies)
        .should("be.visible");
    });

    cy.contains("label", "termos de uso")
      .find("input")
      .check()
      .should("be.checked");

    cy.contains("button", "Enviar formulário").click();

    cy.contains(
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    ).should("be.visible");
  });

  it("Deve verificar os campos obrigatórios", () => {

    cy.contains("button", "Enviar formulário")
    .click();

    cy.contains('p','Digite nome e sobrenome')
    .scrollIntoView()
    .should('be.visible');
   
    cy.contains('p','Informe um email válido')
    .scrollIntoView()
    .should('be.visible');

     cy.contains('p', 'Você precisa aceitar os termos de uso')
    .scrollIntoView()
    .should('be.visible');

  });
});
