describe('Validação de alertas em JavaScript', () => {

    beforeEach(() => {
        cy.login();
        cy.goTo('Alertas JS', 'JavaScript Alerts');
    })

    it('Deve validar o alerta de confirmação', () => {
        cy.on('windos:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!');
        })

        cy.contains('button', 'Mostrar Alert').click();

    })

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!');
            return true; //True simula o click no botão OK do dialogo
        })

        cy.on('windos:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!');
        })

        cy.contains('button', 'Mostrar Confirm').click();
    })

    it('Deve cancelar um dialogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!');
            return false; //False simula o click no botão Cancel do dialogo
        })

        cy.on('windos:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!');
        })

        cy.contains('button', 'Mostrar Confirm').click();

    })

    it('Deve interagir com um prompt e validar a resposta do usuário', () => {

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Teste QA');
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Teste QA! Boas-vindas ao WebDojo!');
        })
         cy.contains('button', 'Mostrar Prompt').click(); 
    })
})