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

    it("Checkboxes", () => {
        cy.visit("/")
        cy.contains("Modal & Overlays").click()
        cy.contains("Toastr").click()
    // "check" command will not uncheck the checked checkbox, you have to use click command for that
        cy.get('[type="checkbox"]').check({force: true})
    })

    it("Lists and dropdowns", () => {
        cy.visit("/")
        // here we cannot use the "select" method because our tag name for dropdown is "nb-select"

        // simple version
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // advanced version
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                // we use trim to get rid of the trailing spaces
                const itemText = listItem.text().trim()

                const colors = {
                    'Light': 'rgb(255, 255, 255)',
                    'Dark': 'rgb(34, 43, 69)',
                    'Cosmic': 'rgb(50, 50, 89)',
                    'Corporate': 'rgb(255, 255, 255)'
                }
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3) {
                    cy.wrap(dropdown).click()
                }
                
            })
        })
    })

    it.skip("Web tables", () => {
        cy.visit("/")
        cy.contains("Tables & Data").click()
        cy.contains("Smart Table").click()

        // 1
        cy.get('tbody').contains('Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', 25)
        })

        // 2
        const age = [20, 30, 40, 200];

        cy.wrap(age).each(age => {
            cy.get('[placeholder="age"]').type(age)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })
})