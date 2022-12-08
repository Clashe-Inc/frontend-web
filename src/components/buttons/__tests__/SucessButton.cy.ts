import SuccessButton from '../SuccessButton.vue';

describe('Button', () => {
  it('should mount', () => {
    const id = 'btn-success1';
    cy.mount(SuccessButton, {
      props: { id },
    });

    cy.get('#btn-success1').contains('OK');
  });
  it('should click', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(SuccessButton, {
      props: {
        onClick: onClickSpy,
      },
    });
    cy.get('#btn-success').trigger('click');
    cy.get('@onClickSpy').should('have.been.called');
  });
});
