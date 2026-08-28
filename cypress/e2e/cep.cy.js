import addresses from '../fixtures/cep.json';

describe ('CEP', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Integração', 'Consulta de CEP');
    })


    it('Deve validar a consulta de CEP', () => {

        cy.intercept('GET', `https://viacep.com.br/ws/${addresses.cep}/json/`,{
            statusCode: 200,
            body: {
                logradouro: addresses.street,
                bairro: addresses.neighborhood,
                localidade: addresses.city,
                uf: addresses.state
            }
        }).as('getCep')

        cy.get('#cep').type(addresses.cep);
        cy.contains('button', 'Buscar').click();
        cy.wait('@getCep');


        cy.get('#street')
          .should('have.value', addresses.street)

        cy.get('#neighborhood')
          .should('have.value', addresses.neighborhood)
       
        cy.get('#city')
          .should('have.value', addresses.city)
         
        cy.get('#state')
          .should('have.value', addresses.state)
        

    })

    it('Deve validar a consulta de CEP com retorno vazio', () => {
          cy.contains('button', 'Buscar').click();
    })

   
})