import { faker } from '@faker-js/faker'

const userName1 = 'standard_user'
const password = 'secret_sauce'


describe('Automation Tests for saucedemo', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.url().should('include', 'https://www.saucedemo.com/')
    });

    it('Test 1: Check Title', () => {
        cy.get('.login_container').should('exist')
        cy.get('.login_logo').should('have.text', 'Swag Labs')
    });

    it('Test 2: Check Username Field & Login', () => {
        cy.get('.login-box').within(() => {
            cy.get('#user-name').should('have.attr', 'placeholder', 'Username')
                .click()
                .type(userName1)
            cy.get('#login-button').should('have.attr', 'value', 'Login')
                .click()
            cy.get('.error-message-container').should('be.visible')
            .find('h3')
            .should('have.text' , 'Epic sadface: Password is required')
            cy.get('#login-button').click() //should not work
            cy.get('#password').type(password)
            cy.get('#login-button').click()
            cy.url().should('include', 'https://www.saucedemo.com/inventory')
            cy.go('back')
            cy.url().should('include', 'https://www.saucedemo.com/')
        })
    });
    it.only('Test 3: Check Password Field', () => {
        
    });
});