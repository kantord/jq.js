{
  // Helper functions for parser
  const _ = require('./node').default
}

// query
query       = value:expression      {return _('query', value)}
expression  = dot_syntax

// MISC
ws          = " "*

// DOT SYNTAX
dot_syntax  = left:number "," right:dot_syntax
                                    {return _('dot_syntax', [
                                      left ].concat(right.value))}
            / value:literal         {return _('dot_syntax', [value])}

// LITERALS
literal     = number

// number literal
number      = ws minus? int frac? ws
                                    {return _('number', text().trim())}
frac        = dec_point int
int         = [0-9]+
minus       = "-"
dec_point   = "."
