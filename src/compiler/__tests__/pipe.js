import _ from '../../common/node'

export default [
  // Pipe syntax
  [_('query', _('pipe', [
    _('number', '3.14'), _('number', '0')
  ])), '(function(input) {return (function(input) {return 0})((function(input) {return 3.14})(input))})'],
  [_('query', _('pipe', [
    _('number', '3.14'), _('number', '3.14'), _('number', '5'), 
  ])), '(function(input) {return (function(input) {return 5})((function(input) {return 3.14})((function(input) {return 3.14})(input)))})']
]
