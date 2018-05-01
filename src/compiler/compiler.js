import _ from '../common/node'

const rules = {
  'number': ({ value }) => value,
  'identity': ({ value }) => 'input',
  'attribute': ({ value }) => `input.${value}`,
  'dot_syntax': ({ value }) =>
    `[${value.map(compile).join(', ')}]`,
  'array': ({ value }) => compile(value),
  'query': ({ value }) => `(function(input) {return ${compile(value)}})`,
  'pipe': ({ value }) => value.length > 1
    ? `(function(input) {return ${compile(value.slice(-1)[0])}})(${compile(_('pipe', value.slice(0, -1)))})`
    : `(function(input) {return ${compile(value[0])}})(input)`
}

const compile = node => rules[node.type](node)

export default compile
