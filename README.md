## Setup

1) Install the Cucumber Cypress extension:

<pre> npm install -–save-dev cypress-cucumber-preprocessor</pre>

2) Point npm's package.json to the exercise folder stracture:

Locate package.json and add the following lines:

 <pre> "cypress-cucumber-preprocessor": {   "nonGlobalStepDefinitions": false,   "step_definitions": "cypress/e2e/steps" } </pre>

See example_package.json in this repository for reference.

## Running the tests:
1) Clone this respository
2) cd to the exercise folder
3) npx cypress open
4) Choose E2E tests and run sanity.feature

## Known issue
The tests are sporadically failing, due to the redirection of the signup account page to the create account.  
The issue is reproducible outside the automation, in an incognito session (see this [video](https://1drv.ms/v/c/48ea15936430ef63/Ee4gYy_xAmJKv47UrbJVdVsBnKjdUJo3GoqFEKGyunUumw?e=twA1f0)), with and without coockies.  
This [video](https://1drv.ms/v/c/48ea15936430ef63/EZzb2LNOvZlMh2nKuWGPyyEBQ9fglHF7HLB5gsb3ZaqxvQ?e=anPAa8) shows the tests passing when they don't encounter that issue.


## Overview

This repo is a proof of concept to the proposal of the [QE strategy](https://1drv.ms/w/c/48ea15936430ef63/ERxWmdVad_1Mn_6qLnQe7xgB90fYOZK6x_wr4cI3BoBMWw?e=3oXfJM) for the signup workflow. It demonstrates some of the key principals and decision making outlined by the strategy. Key factors that guided the development of the POC included:

1) Shift-left: E2E tests tend to be more complicated, less robust and run longer. The POC relys on lower-level tests to cover some of the functionality.
2) Scope:  The tests focus on the UI, not necessarily the actual functionality. For example, the verification of the account creation (verifySignupAPI) checks that the correct API is sent by the UI, but does verify that the account was actually created in the backend by using it. 
3) Some links are not tested. Broken links can leave a bad imperssion on customers, but the POC assumes that they are not likely to regress. It is possible that based on more knowledge, such as internal architecture or the number of times a link was broken, that decision would be changed.
4) Google authtication is not tested. Testing 3rd party functionality should focus on the integration with the 3rd party, and in this case it is better to write a small focused test based on additional internal information, rather than writing a big complicated black-box test case that could be hard to maintain, debug and run.
5) The "book demo" functionality is tested for business users to demonstare the importance of the link to the company. Its absence is not tested for private users, part of risk assesement, as it would not be a critical problem should it mistakenly appear.
6) The links under test are validated using different strategies to demonstrate various options—ranging from simply confirming the URL to performing a full click-and-page validation. The chosen approach depends on factors like the system's architecture and the risk of regression.
7) Negative tests for the username/password were not added, because they should be tested in lower-level. Although these fields are checked in the UI as a first instence, adding a test for them in the UI could complicate the testing and the risk would be low because of the API tests.  Nontheless, disabling the "create" button when the username/password is incorrect, could make the tests easier and possibly worth adding.
8) Generality vs Simplicity: In "The user creates a new account", the test was simplied by not allowing the tester to set tested email/password, but rather give a random email and a fixed password. It was also done do discourage people from overtesting. However, the test has been generalised with the parameter "expected_result", to demonstrate generality as well as future thinking (in case negative test cases are added). It also shows the power of paramertised testing.
9) I did not keep consistency becuase I wanted to demonstrate that practices and standards can vary. An example would using both "#" an "id=" for selectors. Ideally a team should choose one of them and be consistent (I personally prefer "id=" becuase I think it is more readable).
10) I added comments selectively—only where I felt the code lacked clarity or needed additional context. Since comments can become outdated and misleading over time, I prioritize writing self-explanatory code, which can often be a more sustainable solution.
11) Exploratory testing is particularly useful for features that are complex to automate or have a low likelihood of regression—such as Google authentication and email verification in this case. While third-party tools can assist in testing these areas, although version upgrades may introduce maintenance overhead and potential instability.
12) Randomisation is a good tool to increase paramter coverage. The marketing checkbox is randomly checked/unchecked, providing coverage to both states.


## Suggested KPIs

1) The number of regressions reported by the customers (a customer KPI).
2) The number of non-regressions problems reported by customers (a customer KPI).
3) The number of test failures that are not associated with product probxlems (an efficiency KPI).
4) The duration required to execute the test suite, measured both in total and relative to the number of tests performed (an efficiency KPI).
