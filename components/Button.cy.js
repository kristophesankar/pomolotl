import React from 'react'
import Button from './Button'
import { btn } from '@/styles/Index.module.sass'

describe('<Button />', () => {
  it('renders', () => {
    cy.mount(<Button title="Start" onClick={() => console.log('button was clicked') }/>)
    cy.get('button').should('contains.text', 'Start')
    cy.get('[data-cy="button"]').should('have.class', btn)
  })
})
