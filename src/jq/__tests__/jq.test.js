import { expect } from 'chai';
import jq from '../jq'

const tests = [
  ['-3.14', 'foo', [-3.14]],
  ['3.14', 'bar', [3.14]],
  ['3.14,-31', 'bar', [3.14, -31]],
  ['3.14,-31, 0', 'bar', [3.14, -31, 0]],
  ['3.14,-31, 0, 1', 'bar', [3.14, -31, 0, 1]],
  ['.', 'bar', ['bar']],
  ['.', 'baz', ['baz']],
]

describe('jq', () => {
  tests.forEach(([code, input, output]) => {
    it(`executes ${code} with input ${input}`, () => {
      expect(jq(code)(input)).deep.equal(output)
    })
  })
})
