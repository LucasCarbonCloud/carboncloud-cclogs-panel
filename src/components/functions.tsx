import { getTemplateSrv } from '@grafana/runtime';
import { VariableOption } from '@grafana/data';

export function prettifyHeaderNames(name: string, displayLevel: boolean) {
  if (name.startsWith('labels.')) {
    return name.replace(/^labels\./, '');
  } else if (name == 'level' && !displayLevel) {
    return '\u200C';
  } else if (name == 'timestamp') {
    return 'date';
  } else if (name == 'body') {
    return 'message';
  }

  return name;
}

export function getValuesForVariable(name: string): string[] {
  const values: string[] = [];

  // Collects the values in an array.
  getTemplateSrv().replace(`$${name}`, {}, (value: string | string[]) => {
    if (Array.isArray(value)) {
      values.push(...value);
    } else {
      values.push(value);
    }

    // We don't really care about the string here.
    return '';
  });

  return values;
}

export function getOptionsForVariable(name: string): string[] {
  const variable = getTemplateSrv()
    .getVariables()
    .find((v) => v.name === name);

  if (!variable || !('options' in variable)) {
    return [];
  }

  const options = variable.options as VariableOption[];
  return options.map((opt) => opt.value);
}

export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}
