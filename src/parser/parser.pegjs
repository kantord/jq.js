{
  // Helper functions for parser
  const _ = require('../common/node').default
}

// query
query       = value:expression      {return _('query', value)}
expression  = dot_syntax

// MISC
ws          = " "*

// DOT SYNTAX
dot_syntax  = left:literal "," right:dot_syntax
                                    {return _('dot_syntax', [
                                      left ].concat(right.value))}
            / value:literal         {return _('dot_syntax', [value])}

// LITERALS
literal     = number
            / array

// number literal
number      = ws minus? int frac? ws
                                    {return _('number', text().trim())}
frac        = dec_point int
int         = [0-9]+
minus       = "-"
dec_point   = "."

// array literal
array       = "[" values:dot_syntax "]"
                                    {return _('array', values)}
