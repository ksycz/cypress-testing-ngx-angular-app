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

    it("Then and wrap methods", () => { 
         // for to the forms section
         cy.visit("/")
         cy.contains("Forms").click()
         cy.contains("Form Layouts").click()

         cy.contains("nb-card", "Using the Grid").find("[for='inputEmail1']").should('contain', 'Email')
        
         // cypress is asynchronous so we cannot assign the selector to the variables and directly use it, we need to use "then"
        //  inside we have jQuery context, not cypress
        cy.contains("nb-card", "Using the Grid").then(firstForm => {
            const passwordLabelFirst = firstForm.find("[for='inputPassword2']").text()
            expect(passwordLabelFirst).to.equal("Password")

            cy.contains("nb-card", "Basic form").then(secondForm => {
                const passwordLabelSecond = secondForm.find("[for='exampleInputPassword1']").text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

            // going back to the Cypress context
             cy.wrap(secondForm).find("[for='exampleInputPassword1']").should('contain', 'Password')
            })
        })
    })

    it("Invoke command", () => { 
        // for to the forms section
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        // 3 ways on how to get to the text of the web element
        // 1
        cy.get('[for="exampleInputEmail1').should('contain', 'Email address')
        // 2 - jQuery context inside 'then
        cy.get('[for="exampleInputEmail1').then( label => {
            expect(label.text()).to.equal('Email address')
        })   
        // 3
        cy.get('[for="exampleInputEmail1').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        // using invoke to check if the checkbox has the "checked" class
        cy.contains("nb-card", "Basic form")
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        .should('contain', 'checked')
        // or
        // .then(classValue => {
        //     expect(classValue).to.contain('checked')
        // })
    })

     // to read the value or another property from the Inspect console, go to console and type "console.dir($0)"
     it("Assert property", () => {
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Datepicker").click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            // to use cypress syntax in jQuery we need to use cy.wrap()
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('20').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Aug 20, 2020')
        })
    })

      it("Radio buttons", () => {
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Forms Layout").click()

        cy.contains("nb-card", "Using the Grid").find('[type="radio"]').then(radioBtns => {
            cy.wrap(radioBtns)
            .first()
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioBtns)
            .eq(1) // index 1
            .check({force: true})
            cy.wrap(radioBtns)
            .first()
            .should('not.be.checked')

            cy.wrap(radioBtns)
            .eq(2) // index 2
            .should('be.disabled')
        })
       
    })

    it.only("Checkboxes", () => {
        cy.visit("/")
        cy.contains("Modal & Overlays").click()
        cy.contains("Toastr").click()
    // "check" command will not uncheck the checked checkbox, you have to use click command for that
        cy.get('[type="checkbox"]').check({force: true})
    })
})