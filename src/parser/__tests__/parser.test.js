import { expect } from 'chai';
import parser from '../parser'
import literalTests from './literalTests.json'
import dotSyntaxTests from './dotSyntaxTests.json'

const find_leaf = node => 
  typeof node.value === 'object' ? find_leaf(node.value) : node


describe('parser', () => {
  literalTests.forEach(([comment, code, [type, value]]) => {
    it(`parses ${type} literal from ${code} ${comment}`, () => {
      const parser_result = parser(code)
      const leaf = find_leaf(parser_result)
      expect(leaf[0]).deep.equal({ type, value })
    })
  })

  dotSyntaxTests.forEach(([comment, input, output]) => {
    it(`parses ${input} as ${JSON.stringify(output)}`, () => {
      const parser_result = parser(input)
      expect(parser_result).deep.equal(output)
    })
  })

  it('returns query node', () => {
    expect(parser('1')).deep.equal({
      type: 'query', value: {
        type: 'dot_syntax', value: [
          {type: 'number', value: '1'}
        ]
      }
    })
  })
})
