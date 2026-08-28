import { personal, company } from '../fixtures/consultancy.json';

describe('Formulário de Consultoria', () => {
  beforeEach(() => {
    cy.login();
    cy.goTo('Formulários', 'Consultoria');
    cy.fixture('consultancy').as('consultancyData');
  });

  it('Deve solicitar consultoria individual', () => {
    cy.fillConsultancyForm(personal);
    cy.subimitConsultancyForm();
    cy.valideConsultancyMModal();
  });

  it('Deve solicitar consultoria In Company', () => {
    cy.fillConsultancyForm(company);
    cy.subimitConsultancyForm();
    cy.valideConsultancyMModal();
  });

  it('Deve verificar os campos obrigatórios', () => {
    cy.subimitConsultancyForm();

    const requiredFields = [
      { label: 'Nome Completo', message: 'Campo obrigatório' },
      { label: 'Email', message: 'Campo obrigatório' },
      { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
    ];

    requiredFields.forEach(({ label, message }) => {
      cy.contains('label', label)
        .parent()
        .find('p')
        .scrollIntoView()
        .should('be.visible')
        .should('have.text', message);
    });
  
  });
});

