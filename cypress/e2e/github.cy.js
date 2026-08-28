describe('Gerenciamento de perfils no GitHub', () => {
  beforeEach(() => {
    cy.login();
    cy.goTo('Tabela', 'Perfis do GitHub');
  });

  it('Deve verificar se o perfil foi adicionado corretamente', () => {
    cy.get('#name').type('Fernando Papito');
    cy.get('#username').type('fernandopapito');
    cy.get('#profile').type('QA Engineer');

    cy.contains('button', 'Adicionar Perfil').click();

    cy.get('#name').type('Adriano');
    cy.get('#username').type('acaldeira88');
    cy.get('#profile').type('QA');

    cy.contains('button', 'Adicionar Perfil').click();

    cy.contains('table tbody tr', 'Adriano')
    .should('be.visible')
    .as('trProfile')

    cy.get('@trProfile')
    .contains('td','Adriano')
    .should('be.visible')

    cy.get('@trProfile')
    .contains('td','acaldeira88')
    .should('be.visible')

    cy.get('@trProfile')
    .contains('td','QA')
    .should('be.visible')



    
  });

  it('Deve remover um perfil do GitHub', () => {

    const profile = {
      name: 'Adriano',
      username: 'acaldeira88',
      profile: 'QA'
    }

    cy.get('#name').type(profile.name);
    cy.get('#username').type(profile.username);
    cy.get('#profile').type(profile.profile);

    cy.contains('button', 'Adicionar Perfil').click();

    cy.contains('table tbody tr', profile.name)
    .should('be.visible')
    .as('trProfile')

    cy.get('@trProfile').find('button[title="Remover perfil"]').click();

    cy.contains('table tbody tr', profile.name).should('not.exist');


  })

  it.only('Deve validar o link do GitHub', () => {

    const profile = {
      name: 'Adriano',
      username: 'acaldeira88',
      profile: 'QA'
    }

    cy.get('#name').type(profile.name);
    cy.get('#username').type(profile.username);
    cy.get('#profile').type(profile.profile);

    cy.contains('button', 'Adicionar Perfil').click();

    cy.contains('table tbody tr', profile.name)
    .should('be.visible')
    .as('trProfile')

    cy.get('@trProfile').find('a')
    .should('have.attr', 'href', 'https://github.com/' + profile.username)
    .and('have.attr', 'target', '_blank')

  })
  it('Deve verificar se o perfil foi adicionado corretamente', () => {
    cy.contains('Adicionar Perfil').click();

    const requiredFields = [
      { label: 'Nome', message: 'Nome é obrigatório' },
      { label: 'Username do GitHub *', message: 'Username é obrigatório' },
      { label: 'Perfil', message: 'Perfil é obrigatório' },
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
