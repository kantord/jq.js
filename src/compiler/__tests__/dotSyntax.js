import _ from '../../common/node'

export default [
  // Dot syntax
  [_('query', _('dot_syntax', [
    _('number', '3.14'), _('number', '0')
  ])), '(function(input) {return [3.14, 0]})'],
  [_('query', _('dot_syntax', [
    _('number', '3.11'), _('number', '0'), _('number', '1')
  ])), '(function(input) {return [3.11, 0, 1]})'],
  [_('query', _('dot_syntax', [
    _('number', '3.11'), _('number', '0'), _('number', '1')
  ])), '(function(input) {return [3.11, 0, 1]})'],
]
