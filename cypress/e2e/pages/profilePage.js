// The progile page for business users
class ProfilePage {
    USER_DETAILS_ALIAS = "user_details_alias";
    FULL_NAME_DEFAULT = "John Doe";
    COMPANY_DEFAULT = "AAA";
    EMPLOYEE_RANGE_DEFAULT = "10 - 49";
    COUNTRY_DEFAULT = "Germany";
    PHONE_DEFAULT = "33333333";
    
    elements = {
        fullName_editbox: () => { return cy.get('input[id="fullName"]') },
        company_editBox: () => { return cy.get('input[id="company"]') },
        employees_dropdown: () => { return cy.get('fieldset[id="numberOfEmployees"]') },
        employees_dropdown_value: (employeeNumRange) => { return cy.get('button[value="' + employeeNumRange + '"]') },
        country_dropdown: () => { return cy.get('fieldset[id="country"]') },
        country_dropdown_value: (country) => { return cy.get('button[value="' + country + '"]') },
        phone_editBox: () => { return cy.get('input[id="telephone"]') },
        save_button: () => { return cy.get('button[data-testid="save-profile"]') },
        switch_button: () => { return cy.get('button[title=Switch account')}
    }

    verify() {
        cy.url({ timeout: 10000 }).should('include', '/business-signup');
    }

    setFullName(fullName=this.FULL_NAME_DEFAULT) {
        this.elements.fullName_editbox().type(fullName);
    }

    setCompany(company=this.COMPANY_DEFAULT) {
        this.elements.company_editBox().type(company);
    }
    
    setEmployess(employeeNumRange=this.EMPLOYEE_RANGE_DEFAULT) {
        this.elements.employees_dropdown().click()
        this.elements.employees_dropdown_value(employeeNumRange).click();
    }

    setCountry(country=this.COUNTRY_DEFAULT) {
        this.elements.country_dropdown().click()
        this.elements.country_dropdown_value(country).click();
    }
    
    setPhone(phone=this.PHONE_DEFAULT) {
        this.elements.phone_editBox().type(phone);
    }

    clickSave() {
        cy.intercept('PUT', '**/credentials/user-details').as(this.USER_DETAILS_ALIAS);
        this.elements.save_button().click();
    }
    
    setProfile() {
        this.verify();
        this.setFullName();
        this.setCompany();
        this.setEmployess();
        this.setCountry();
        this.setPhone();
        this.clickSave();
    }
    
    verifyDetailsAPI() {
            cy.wait('@' + this.USER_DETAILS_ALIAS); 
            cy.get('@' + this.USER_DETAILS_ALIAS).then((userDetails) => {      
            /*userDetails example:
            { businessSize: "50 - 249", 
            company: "BBB", 
            country:"American Samoa",
            displayName:"Bob", 
            telephone:2736847236
            }
            */
            expect(userDetails["request"]["body"]["company"], 
                'The UI did not send the correct company name to the backend').to.equal(this.COMPANY_DEFAULT);
            expect(userDetails["request"]["body"]["country"], 
                'The UI did not send the correct country name to the backend').to.equal(this.COUNTRY_DEFAULT);
        });
    }
}
const profilePage = new ProfilePage();
export default profilePage;