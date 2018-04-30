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
dot_syntax  = left:simple_expr "," right:dot_syntax
                                    {return _('dot_syntax', [
                                      left ].concat(right.value))}
            / value:simple_expr     {return _('dot_syntax', [value])}

// SIMPLE EXPRESSION
simple_expr = literal
            / attribute_expr

// ATTRIBUTE EXPRESSIONS
attribute_expr
            = attribute
            / identity

identity    = ws "." ws             {return _('identity', null)}
attribute    = ws "." iden:iden ws  {return _('attribute', iden)}

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

// IDENTIFIER
iden        = iden_head iden_part*  {return text()}
iden_head   = unicode_letter
            / "$"
            / "_"
iden_part   = iden_head
            / unicode_combining_mark
            / unicode_digit
unicode_letter
            = [A-z]
unicode_combining_mark
            = [_]
unicode_digit
            = [0-9]
