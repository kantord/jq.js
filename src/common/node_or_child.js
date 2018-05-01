import _ from './node'

const node_or_child = (type, value) =>
  value.length === 1
    ? value[0]
    : _(type, value)

export default node_or_child
