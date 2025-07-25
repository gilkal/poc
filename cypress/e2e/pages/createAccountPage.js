class CreateAccountPage {
    ACCOUNT_DETAILS_ALIAS = "account_details_alias";
    CREATE_ACCOUNT_URL = 'https://q-www.ninox.com/create-account';
    elements = {
        email_textbox: () => { return cy.get('input[id="email"]') },
        password_textbox: () => { return cy.get('input[id="password"]') },
        create_button: () => { return cy.get('button[data-testid="create-account"]')},
        signIn_link: () => { return cy.get('a[data-testid="login"]') },
        bookDemo_link: () => { return cy.contains('Book your demo') }, // TODO: Change to a more robust selector
        marketing_checkbox: () => { return cy.get('input[name="marketing"]') }
    }


    verify() {
        cy.url({ timeout: 10000 }).should('include', '/create-account');
    }

    visit() {
       cy.visit(this.CREATE_ACCOUNT_URL);
    }

    clickSignIn() {
       this.elements.signIn_link().click();
    }

    clickBookDemo() {
        this.elements.bookDemo_link().click();
    }
    createAccount(username, password, expectedMarketing) {
        this.verify();
        cy.intercept('POST', '**/credentials/signup').as(this.ACCOUNT_DETAILS_ALIAS);
        this.elements.email_textbox().type(username);
        this.elements.password_textbox().type(password);
        if (expectedMarketing) {
            this.elements.marketing_checkbox().check({force: true});
        }
        this.elements.create_button().click({force: true});
    }

    verifySignupAPI(expectedEmail, expectePassword, expectedMarketing) {
        cy.wait('@' + this.ACCOUNT_DETAILS_ALIAS); 
        cy.get('@' + this.ACCOUNT_DETAILS_ALIAS).then((accountDetails) => {
          /* accountDetails example:
           {
           "email": "john@doe.com",
           "isBusiness": true,
           "language":"en", 
           "marketing": false, 
           "noTeam": false, "password":
           "YoungAtheart1@", 
           "userType": "business"
            }
            TODO: add checkes for the other parameters
            */
            expect(accountDetails["request"]["body"]["email"],
                 'The UI did not send the correct email name to the backend').to.equal(expectedEmail);
            expect(accountDetails["request"]["body"]["password"],
                 'The UI did not send the correct password to the backend' ).to.equal(expectePassword);
            expect(accountDetails["request"]["body"]["marketing"], 
                'The UI did not send the correct marketing flag to the backend').to.equal(expectedMarketing);
        });
    }
}

const createAccountPage = new CreateAccountPage();
export default createAccountPage;
