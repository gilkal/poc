class DashboardPage {
    elements = {
        //TODO: find a more robust selectors
        emailVerification_text: () => { return cy.get('[class="EmailVerificationReminder_text"]') }, 
        resendActivationEmail_button: () => { return cy.get('button[title="Resend email"]') } 
    }
    
    verify() {
        cy.url( {timeout: 10000} ).should('include', 'https://qs-app.ninox.com/#/teams');
    }
    
    checkEmailVerificationInUI(msg) {
        this.elements.emailVerification_text({timeout: 10000}).should('contain.text',  'Verify your email address'); 
        this.elements.resendActivationEmail_button({timeout: 10000}).should('exist');
    }

}
const dashboardPage = new DashboardPage();
export default dashboardPage;