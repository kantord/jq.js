import parse from './parser'
import compile from './compiler'

const jq = (source_code) => eval(compile(parse(source_code)))

export default jq
