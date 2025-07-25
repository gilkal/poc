class SigninPage {

    verify() {
        cy.url().should('include', 'ninox.com/sign-in');
    }
}

const signinPage = new SigninPage();
export default signinPage;