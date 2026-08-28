Cypress.Commands.add('fillConsultancyForm', (form) => {
  cy.get('#name').clear();

  cy.get('#name').type(form.name);
  cy.get('#email').type(form.email);
  cy.get('#phone').type(form.phone).should('have.value', '(11) 99999-1000');
  cy.get('#consultancyType').select(form.consultancyType);

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
      .find('input')
      .check()
      .should('be.checked');

    cy.contains('label', 'Pessoa Física')
      .find('input')
      .should('be.not.checked');

    cy.contains('label', 'CNPJ').parent().find('input').type(form.document);
  }

  form.discorveryChannels.forEach((channel) => {
    cy.contains('label', channel).find('input').check().should('be.checked');
  });

  cy.get('input[type="file"]').selectFile(form.file, {
    force: true,
  });

  cy.get('#details').type(form.description);

  form.tech.forEach((tech) => {
    cy.get('#technologies').type(tech).type('{enter}');

    cy.contains('label', 'Tecnologias')
      .parent()
      .contains('span', tech)
      .should('be.visible');
  });

  if (form.termsOfUse === true) {
    cy.contains('label', 'termos de uso')
      .find('input')
      .check()
      .should('be.checked');
  }
});

Cypress.Commands.add('subimitConsultancyForm', () => {
  cy.contains('button', 'Enviar formulário').click();
});

Cypress.Commands.add('valideConsultancyMModal', () => {
  cy.get('.modal', { timeout: 70000 })
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .should(
        'have.text',
        'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.',
      );
})
