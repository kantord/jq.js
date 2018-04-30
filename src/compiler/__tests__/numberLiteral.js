import _ from '../../common/node'

export default [
  // Number literal
  [_('number', '1'), '1'],
  [_('number', '-3.14'), '-3.14'],
  [_('query', _('number', '-3.14')), '(function(input) {return -3.14})'],
  [_('query', _('number', '3.14')), '(function(input) {return 3.14})'],
]
