import parser from './parser.pegjs'
import Tracer from 'pegjs-backtrace';

const parse = source_code => {
  const tracer = new Tracer(source_code, { parent: true }); // input text is required.
  try {
    return parser.parse(source_code, { tracer })
  } catch(e) {
    console.log(tracer.getBacktraceString());
    throw e
  }
}

export default parse
