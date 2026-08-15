import { personal, company } from "../fixtures/consultancy.json";

Cypress.Commands.add("fillConsultancyForm", (form) => {
  cy.get("#name").clear();

  cy.get("#name").type(form.name);
  cy.get("#email").type(form.email);
  cy.get("#phone").type(form.phone).should("have.value", "(11) 99999-1000");
  cy.get("#consultancyType").select(form.consultancyType);

  if (form.personType === 'cpf') {
    cy.contains('label', 'Pessoa Física')
      .find('input')
      .check()
      .should('be.checked');

    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('be.not.checked');
  }

  if (form.personType === 'cnpj') {
    cy.contains('label', 'Pessoa Jurídica')
      .find("input")
      .check()
      .should("be.checked");

    cy.contains('label', 'Pessoa Física')
      .find('input')
      .should('be.not.checked');

    cy.contains('label','CNPJ')
    .parent()
    .find('input')
    .type(form.document)
  }


  form.discorveryChannels.forEach((channel) => {
    cy.contains("label", channel).find("input").check().should("be.checked");
  });

  cy.get('input[type="file"]').selectFile(form.file, {
    force: true,
  });

  cy.get("#details").type(form.description);

  form.tech.forEach((tech) => {
    cy.get("#technologies").type(tech).type("{enter}");

    cy.contains("label", "Tecnologias")
      .parent()
      .contains("span", tech)
      .should("be.visible");
  });

  if (form.termsOfUse === true) {
    cy.contains("label", "termos de uso")
      .find("input")
      .check()
      .should("be.checked");
  }
});

describe("Formulário de Consultoria", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Formulários", "Consultoria");
    cy.fixture("consultancy").as("consultancyData");
  });

  it("Deve solicitar consultoria individual", () => {
    cy.fillConsultancyForm(personal);

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 70000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .should(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );
  });

  it("Deve solicitar consultoria In Company", () => {
    cy.fillConsultancyForm(company);

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 70000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .should(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );
  });

  it("Deve verificar os campos obrigatórios", () => {
    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo")
      .parent()
      .find("p")
      .scrollIntoView()
      .should("be.visible")
      .should("have.text", "Campo obrigatório");

    cy.contains("label", "Email")
      .parent()
      .find("p")
      .scrollIntoView()
      .should("be.visible")
      .should("have.text", "Campo obrigatório");

    cy.contains("p", "Você precisa aceitar os termos de uso")
      .scrollIntoView()
      .should("be.visible");
  });
});
