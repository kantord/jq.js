import { expect } from 'chai';
import parser from '../parser'

const find_leaf = node => 
  typeof node.value === 'object' ? find_leaf(node.value) : node

const literalTests = [
  ['', '1',         ['number', '1']],
  ['', '1.0',       ['number', '1.0']],
  ['', '1.01202',   ['number', '1.01202']],
  ['', '2',         ['number', '2']],
  ['', '23456789',  ['number', '23456789']],
  ['', '-34',       ['number', '-34']],
  ['', '-34.12',    ['number', '-34.12']],
]

const dotSyntaxTests = [
  ['', '1,2', {
    type: 'query', value: {
      type: 'dot_syntax', value: [
        {type: 'number', value: '1'},
        {type: 'number', value: '2'},
      ]
    }
  }],
  ['', '1.2 , -4', {
    type: 'query', value: {
      type: 'dot_syntax', value: [
        {type: 'number', value: '1.2'},
        {type: 'number', value: '-4'},
      ]
    }
  }],
  ['', '1.2 , -4, 0', {
    type: 'query', value: {
      type: 'dot_syntax', value: [
        {type: 'number', value: '1.2'},
        {type: 'number', value: '-4'},
        {type: 'number', value: '0'},
      ]
    }
  }],
  ['', '1.2 , -4, 0, 0', {
    type: 'query', value: {
      type: 'dot_syntax', value: [
        {type: 'number', value: '1.2'},
        {type: 'number', value: '-4'},
        {type: 'number', value: '0'},
        {type: 'number', value: '0'},
      ]
    }
  }],

]


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
