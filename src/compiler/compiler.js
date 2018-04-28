const rules = {
  'number': ({ value }) => value,
  'dot_syntax': ({ value }) =>
    `[${value.map(compile).join(', ')}]`,
  'query': ({ value }) => `(function(input) {return ${compile(value)}})`,
}

const compile = node => rules[node.type](node)

export default compile
