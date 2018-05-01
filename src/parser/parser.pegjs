{
  // Helper functions for parser
  const _ = require('../common/node').default
  const _$ = require('../common/node_or_child').default
}

// query
query       = value:expression      {return _('query', value)}
expression  = dot_syntax

// MISC
ws          = " "*

// DOT SYNTAX
dot_syntax  = ws left:pipe ws right:(("," ws pipe ws)*)
                {
                  return _('dot_syntax',
                    right.reduce(
                      (result, element) => result.concat([element[2]]),
                      [left]
                    )
                  )
                }

// PIPE
pipe  = ws left:simple_expr ws right:(("|" ws simple_expr ws)*)
                {
                  return _$('pipe',
                    right.reduce(
                      (result, element) => result.concat([element[2]]),
                      [left]
                    )
                  )
                }

// SIMPLE EXPRESSION
simple_expr = attribute_expr
            / literal

// ATTRIBUTE EXPRESSIONS
attribute_expr
            = attribute
            / identity

identity    = "."             {return _('identity', null)}
attribute    = "." iden:iden  {return _('attribute', iden)}

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
array       = ws "[" values:dot_syntax "]" ws
                                    {return _('array', values)}

// IDENTIFIER
iden        = iden_head iden_part*  {return text()}
iden_head   = unicode_letter
            / "$"
            / "_"
iden_part   = iden_head
            / unicode_digit
unicode_letter
            = [A-z]
unicode_combining_mark
            = [_]
unicode_digit
            = [0-9]
