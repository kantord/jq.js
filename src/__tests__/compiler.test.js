import { expect } from 'chai';
import compiler from '../compiler'
import _ from '../node'

const literalTests = [
  [_('number', '1'), '1'],
  [_('number', '-3.14'), '-3.14'],
  [_('query', _('number', '-3.14')), '(function(input) {return -3.14})'],
  [_('query', _('number', '3.14')), '(function(input) {return 3.14})'],
  [_('query', _('dot_syntax', [
    _('number', '3.14'), _('number', '0')
  ])), '(function(input) {return [3.14, 0]})'],
  [_('query', _('dot_syntax', [
    _('number', '3.11'), _('number', '0'), _('number', '1')
  ])), '(function(input) {return [3.11, 0, 1]})'],
]

describe('parser', () => {
  literalTests.forEach(([node, code_out]) => {
    it(`compiles ${JSON.stringify(node)} to ${code_out}`, () => {
      expect(compiler(node)).equal(code_out)
    })
  })
})
