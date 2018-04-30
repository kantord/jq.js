import { expect } from 'chai';
import compiler from '../compiler'
import numberLiteral from './numberLiteral'
import arrayLiteral from './arrayLiteral'
import attribute from './attribute'
import dotSyntax from './dotSyntax'

const tests = [
  numberLiteral,
  arrayLiteral,
  attribute,
  dotSyntax,
].reduce((a, b) => a.concat(b), [])

describe('parser', () => {
  tests.forEach(([node, code_out]) => {
    it(`compiles ${JSON.stringify(node)} to ${code_out}`, () => {
      expect(compiler(node)).equal(code_out)
    })
  })
})
