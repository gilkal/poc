class SignUp {
    SIGNUP_URL = 'https://q-www.ninox.com/en/sign-up';
    elements = {
        account_option: (type) => { return cy.get('[data-testid="option-' + type + '"]') },
        create_button: () => { return cy.get('button[data-testid="go-next"]') },
        signIn_link: () => { return cy.get('a[data-testid="login"]') }
    }

    verify() {
        cy.url().should('include', '/sign-up');
    }

    visit() {
        cy.visit(this.SIGNUP_URL);
        this.verify()
    }

    chooseAccountType(type) {
        this.elements.account_option(type).click();
        this.elements.create_button().click();
    }

}
const signUpPage = new SignUp();
export default signUpPage;