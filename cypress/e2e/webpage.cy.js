import { faker } from '@faker-js/faker'
const fakePassword = faker.internet.password({ length: 8 });

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
                .should('have.text', 'Epic sadface: Password is required')
            cy.get('#login-button').click() //should not work
            cy.get('#password').type(password)
            cy.get('#login-button').click()
            cy.url().should('include', 'https://www.saucedemo.com/inventory')
            cy.go('back')
            cy.url().should('include', 'https://www.saucedemo.com/')
        })
    });
    it('Test 3: Check Password Field & Login', () => {
        cy.get('#password').should('have.attr', 'placeholder', 'Password')
            .click()
            .should('be.empty')
            .type(fakePassword)
        cy.get('#login-button').click()
        cy.get('.error-message-container').should('exist')
            .and('is.visible')
        cy.get('#password').clear()
            .type(password)
        cy.get('#user-name').click()
            .type(userName1)
        cy.get('#login-button').click()
        cy.url().should('include', 'https://www.saucedemo.com/inventory')
        cy.go('back')
        cy.url().should('include', 'https://www.saucedemo.com/')

    });

    it('Test 4: Access to Inventory Page', () => {
        accLogin(userName1, password)
    });

    it('Test 5: Side Menu Options', () => {
        accLogin(userName1, password)
        cy.get('.bm-burger-button').should('exist')
            .and('is.visible')
            .click()
        cy.get('.bm-menu').should('exist')
            .and('is.visible')
        cy.get('.bm-item-list').children()
            .should('have.length', 4)
        cy.get('.bm-item-list').children().eq(0).should('have.text', 'All Items')
        cy.get('.bm-item-list').children().eq(1).should('have.text', 'About')
        cy.get('.bm-item-list').children().eq(2).should('have.text', 'Logout')
        cy.get('.bm-item-list').children().eq(3).should('have.text', 'Reset App State')
    });

    it('Test 6: Filter', () => {
        accLogin(userName1, password)
        cy.get('.product_sort_container').should('exist')
            .and('be.visible')
            .children().should('have.length', 4)
        cy.get('.product_sort_container')
            .select(1)
        cy.get('.active_option').should('have.text', 'Name (Z to A)')

    });
});

function accLogin(Username, Password) {
    cy.get('#user-name').type(Username)
    cy.get('#password').type(Password)
    cy.get('#login-button').click()
    cy.url().should('include', 'https://www.saucedemo.com/inventory')
}