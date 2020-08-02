/// <reference types="cypress" />

describe('Our first test suite', () => {
    it("First test", () => {

    }) 

    it("Finding web elements", () => {

        // for to the forms section
        cy.visit("/")
        cy.contains("Forms")
        cy.contains("Forms Layouts")

        // element containing the specific text
        cy.contains("Horizontal form")

        // element containing data attributes
        cy.contains("[data-cy='testElement']")

        // element containing data attribute and the text - they do not have to be on the same level
        cy.contains("[status='warning']", "Sign in")

        // find button in the form that contains the email input with the specific id (button and email input are sibilings), then click checkbox in the same form
        cy.get("#inputEmail3")
            .parents("form")
            .find("button")
            .should("contain", "Sign in")
            .parents("form")
            .find("nb-checkbox")
            .click()

        // find email input in the element that "nb-card" containing the "Horizontal form" text (they are not on the same level)
        cy.contains("nb-card", "Horizontal form").find("[type='email']")
    })

    it.only("Then and wrap methods", () => { 
         // for to the forms section
         cy.visit("/")
         cy.contains("Forms")
         cy.contains("Forms Layouts")

         cy.contains("nb-card", "Using the Grid")
    }
})