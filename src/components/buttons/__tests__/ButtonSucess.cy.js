import ButtonSuccess from '../ButtonSuccess.vue';

describe('Button', () => {
  it('should mount', () => {
    cy.mount(ButtonSuccess, {
      props: {
        id: 'btn-success1',
      },
    });

    cy.get('#btn-success1').contains('OK');
  });
  it('should click', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(ButtonSuccess, {
      props: {
        onClick: onClickSpy,
      },
    });
    cy.get('#btn-success').trigger('click');
    cy.get('@onClickSpy').should('have.been.called');
  });
});
