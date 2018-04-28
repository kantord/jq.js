import parse from '../parser/parser.js'
import compile from '../compiler/compiler'

const jq = (source_code) => eval(compile(parse(source_code)))

export default jq
