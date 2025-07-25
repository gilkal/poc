class CookiesPage {
    elements = {
      cookies_dialog: () => cy.get('#CybotCookiebotDialog'),
      acceptAll_button: () => cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
    };
    
    verify() {
      this.elements.cookies_dialog().should('exist');
    }


    acceptAllCookies() {
       this.elements.acceptAll_button().click()
    }
  }
  
  const cookiesPage = new CookiesPage();
  export default cookiesPage;