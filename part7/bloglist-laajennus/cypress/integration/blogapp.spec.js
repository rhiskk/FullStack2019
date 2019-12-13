/* eslint-disable no-undef */
describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'user',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('user can login', function() {
    cy.contains('Login to application')
    cy.get('#username').type('user')
    cy.get('#password').type('password')
    cy.get('#login').click()
    cy.contains('test user logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Login to application')
      cy.get('#username').type('user')
      cy.get('#password').type('password')
      cy.get('#login').click()
    })

    it('name of the user is shown', function () {
      cy.contains('test user logged in')
    })

    it('user can create a new blog', function() {
      cy.get('[data-cy=toggleCreate]').click()
      cy.get('#title').type('titletest')
      cy.get('#author').type('authortest')
      cy.get('#url').type('google.com')
      cy.get('[data-cy=create]').click()
      cy.contains('a new blog titletest by authortest added')
    })

  })
})