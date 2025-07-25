import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import cookiesPage from "../pages/cookiesPage.js";
import createAccountPage from "../pages/createAccountPage.js";
import dashboardPage from "../pages/dashboardPage.js";
import profilePage from "../pages/profilePage.js";
import ninoxStagingPage from "../pages/ninoxStagingPage.js";
import signinPage from "../pages/signinPage.js";
import signupPage from "../pages/signupPage.js";

const salesContactLink = 'https://ninox.com/en/contact-sales';
var expectedAccountUser = "";
var expectedPassword = "";
var expectedMarketing = Math.random() < 0.5; // randomly chooses if to check marketing or not.



Given("the user is in the signup page", () => {
    ninoxStagingPage.visit();
    cookiesPage.verify();
    cookiesPage.acceptAllCookies();
    ninoxStagingPage.goToSignup();
});

When("The user creates a {string} account", (accountType) => {
        
    expectedPassword = "Password123!"; 
    const randString = Date.now();
    // checking using a random email adress, to avoid an 'already exists' error
    expectedAccountUser = "email" + randString + "@dummy.com";
    
    signupPage.verify();
    signupPage.chooseAccountType(accountType);
    createAccountPage.createAccount(expectedAccountUser, expectedPassword, expectedMarketing);
    if (accountType == "business") {
        profilePage.setProfile(); 
    }
});

Then("The {string} account creation {string}", (accountType, expected_result) => {
    if (expected_result == "succeeds") {
        if (accountType == "business") {
            profilePage.verifyDetailsAPI();
        }
        createAccountPage.verifySignupAPI(expectedAccountUser, expectedPassword, expectedMarketing);
        dashboardPage.verify();
        cookiesPage.verify();
        cookiesPage.acceptAllCookies();
        dashboardPage.checkEmailVerificationInUI();
    }
});


When("The user clicks the sign in button", () => {
    createAccountPage.clickSignIn();
});

Then("They reach the sign in page", () => {
    signinPage.verify();
});

When("The user navigates to the business account creation page", () => {
    signupPage.chooseAccountType("business");
});

Then("The page contains the relevant links", () => {
    cy.get('a[href="' + salesContactLink + '"]').should('exist');
});

