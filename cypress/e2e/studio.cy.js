describe('template spec', () => {
  it('passes', () => {
    cy.visit("http://localhost:3000");
 
    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').click();
    cy.get('#password').type('katana123');
    cy.get('#root button.text-white').click();
    cy.get('[data-cy="user-name"]').click();

    cy.get('[data-cy="user-name"]').should('be.visible');
    cy.get('#root button:nth-child(1) h4.font-semibold').click();
    cy.get('#name').click();
    cy.get('#name').type('adriano lucas');
    cy.get('#email').type('acaldeira@gmail.com');
    cy.get('#phone').type('(11) 99970-8780');
    cy.get('#consultancyType').select('inCompany');
    cy.get('#document').click();
    cy.get('#document').type('372.862.668-61');
    cy.get('#root div.flex-col.gap-4 label:nth-child(1)').should('have.text', 'Pessoa Física');
    cy.get('#root div.flex-col.gap-4 label:nth-child(2) span.text-gray-300').should('be.visible');
    cy.get('#root div.md\\:grid-cols-3 label:nth-child(1) input.rounded').check();
    cy.get('#root label:nth-child(4) input.rounded').check();
    cy.get('#root label:nth-child(2) input.rounded').check();
    cy.get('#root label:nth-child(5) input.rounded').check();
    cy.get('#root label:nth-child(3) input.rounded').check();
    cy.get('#root label:nth-child(3) input.rounded').uncheck().should('not.be.checked');
    cy.get('#root div.border span').click();
    cy.get('input[type="file"]').selectFile("./cypress/fixtures/document.pdf", {
      force: true,
    });

    cy.get('#details').click();
    cy.get('#details').type('teste studio');
    cy.get('#technologies').click();
    cy.get('#technologies').type('cypress{enter}');
    cy.get('#root div:nth-child(8) input.rounded').check();
    cy.get('#root a.hover\\:text-\\[\\#996DFF\\]').should('be.visible');
    cy.get('#root button.flex').click();
    cy.get('#root div.modal-content').click();
    cy.get('#root p.leading-relaxed').should('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.');
    cy.get('#root button.rounded-lg.text-white').click();
  });

  it('login', function() {
    cy.visit('http://localhost:3000/consultancy')
    
  });

  it('login invalido', function() {
    cy.visit('http://localhost:3000')
    
    cy.get('#email').click();
    cy.get('#email').type('acaldeira@gmail.com');
    cy.get('#password').type('Uoldiveo@10');
    cy.get('#root button.text-white').click();
    cy.get('div.title').should('have.text', 'Acesso negado! Tente novamente.');
  });

  it('Arrastar', function() {
    cy.visit('http://localhost:3000')
     
    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').click();
    cy.get('#password').type('katana123');
    cy.get('#root button.text-white').click();
    cy.get('#root button:nth-child(4) h4.font-semibold').click();
    cy.get('#root div.grid').click();
  });
})