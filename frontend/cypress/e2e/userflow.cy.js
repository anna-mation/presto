describe('user happy path', { testIsolation: false }, () => {
  it('should navigate to the login screen successfully', () => {
    cy.visit('127.0.0.1:8080/login');
    cy.url().should('include', '127.0.0.1:8080/login');
  });

  it('should navigate to the register screen successfully after clicking register button', () => {
    cy.get('button[name="register-button"]').click();
    cy.url().should('include', '127.0.0.1:8080/register');
  });

  it('should register the user and enter the dashboard', () => {
    cy.get('input[name="register-name"]').focus().type('random');
    cy.get('input[name="register-email"]').focus().type('randomemail@gmail.com');
    cy.get('input[name="register-password"]').focus().type('axeoirjawomwrrghoiajhma14124159808');
    cy.get('input[name="register-password-confirm"]').focus().type('axeoirjawomwrrghoiajhma14124159808');

    cy.get('button[name="register-button"]').click();
    cy.url().should('include', '127.0.0.1:8080/dashboard');
  });

  it('should create a new presentation successfully', () => {
    cy.url().should('include', '127.0.0.1:8080/dashboard');
    cy.wait(1000);
    cy.url().should('include', '127.0.0.1:8080/dashboard');
    cy.get('button[name="create-presentation"]').should('exist');
    cy.get('button[name="logout"]').should('exist');

    cy.get('[name="create-presentation"]').click();
    cy.get('input[name="presentation-title"]').focus().type('Test 1');
    cy.get('input[name="presentation-description"]').focus().type('Description 1');
    cy.get('input[name="presentation-thumbnail"]')
      .focus()
      .type('https://cdn.britannica.com/38/141038-050-193F4470/anteater-tamandua.jpg');
    cy.get('button[name="presentation-create"]').click();
    cy.url().should('include', '127.0.0.1:8080/dashboard');
  });

  // it('should delete a presentation successfully', () => {
  //   cy.get('card[name="presentation"]').click();
  //   cy.get('button[name="delete-presentation"]').click();
  //   cy.get('button[name="delete-confirm"]').click();
  //   cy.url().should('include', '127.0.0.1:8080/dashboard');
  //   cy.get('card[name="presentation"]').click().should('not.exist');
  // })

  // it('should add some slides in the slideshow and switch between them again', () => {
  //   cy.get('button[name="new-presentation"]').click();
  //   cy.get('input[name="presentation-title"]').focus().type('Test 1');
  //   cy.get('input[name="presentation-description"]').focus().type('Description 1');
  //   cy.get('input[name="presentation-thumbnail"]').focus().type('https://cdn.britannica.com/38/141038-050-193F4470/anteater-tamandua.jpg');
  //   cy.get('button[name="presentation-create"]').click();
  //   cy.url().should('include', '127.0.0.1:8080/dashboard');

  //   cy.get('card[name="presentation"]').click();
  //   cy.get('[title="Add slide"]').click();
  //   cy.get('[title="Add slide"]').click();
  //   cy.get('[title="Next Slide"]').should('exist');
  //   cy.get('[title="Next Slide"]').click();
  //   cy.get('[title="Previous Slide"]').click();
  //   cy.get('[name="slide-number"]').should('have.text', (slideNum + 1).toString());

  //   cy.get('[title="Next Slide"]').click();
  //   cy.get('[name="slide-number"]').should('have.text', (slideNum + 1).toString());
  // })

  // it('should log out of the application successfully', () => {
  //   cy.get('button[name="back-to-dashboard"]').click();
  //   cy.url().should('include', '127.0.0.1:8080/dashboard');
  //   cy.get('button[name="logout"]').click();
  //   cy.url().should('include', '127.0.0.1:8080/login');
  // })

  // it('should log back into the application successfully', () => {
  //   cy.get('input[name="login-email"]').focus().type('randomemail@gmail.com');
  //   cy.get('input[name="login-password"]').focus().type('randompassword');
  //   cy.get('button[name="login-button"]').click();
  //   cy.url().should('include', '127.0.0.1:8080/dashboard');
  // })
});
