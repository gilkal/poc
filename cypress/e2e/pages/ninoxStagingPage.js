class NinoxStagingPage {
    NINOX_PRODUCTION_ENVIRONMENT = "https://q-www.ninox.com/en";
    elements = {
        tryForFree_button: () => cy.contains('Try for free') // TODO: Change to a more robust selector
    }
    
    visit() {
        cy.visit(this.NINOX_PRODUCTION_ENVIRONMENT);
    }

    goToSignup() {
        this.elements.tryForFree_button().click()
    }
}
const ninoxStagingPage = new NinoxStagingPage();
export default ninoxStagingPage;