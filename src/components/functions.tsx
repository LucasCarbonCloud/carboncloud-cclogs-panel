export function prettifyHeaderNames(name: string, displayLevel: boolean) {
  if (name.startsWith('labels.')) {
    return name.replace(/^labels\./, '');
  } else if (name == 'level' && !displayLevel) {
    return '';
  } else if (name == 'timestamp') {
    return 'date';
  } else if (name == 'body') {
    return 'message';
  }

  return name;
}
