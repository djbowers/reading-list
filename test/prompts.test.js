const bddStdin = require('bdd-stdin')
const { expect } = require('chai')

const { inputPrompt, listPrompt } = require('../src/prompts')

const KEYS = {
  up: '\u001b[A',
  down: '\u001b[B',
}

describe('Prompts', () => {
  describe('listPrompt', () => {
    it('selects the first value from a list', async () => {
      bddStdin('\n')
      const { choice } = await listPrompt('select option1', [
        'option1',
        'option2',
        'option3',
      ])
      expect(choice).to.equal('option1')
    })

    it('selects the second value from a list', async () => {
      bddStdin(KEYS.down, '\n')
      const { choice } = await listPrompt('select option2', [
        'option1',
        'option2',
        'option3',
      ])
      expect(choice).to.equal('option2')
    })

    it('selects the last value from a list', async () => {
      bddStdin(KEYS.up, '\n')
      const { choice } = await listPrompt('select option3', [
        'option1',
        'option2',
        'option3',
      ])
      expect(choice).to.equal('option3')
    })
  })

  describe('inputPrompt', () => {
    it('captures the input query', async () => {
      bddStdin('foo', '\n')
      const { query } = await inputPrompt('enter a search term')
      expect(query).to.equal('foo')
    })
  })
})
