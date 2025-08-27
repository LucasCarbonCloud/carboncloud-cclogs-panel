import { getTemplateSrv } from '@grafana/runtime';
import { VariableOption } from '@grafana/data';
import dayjs from 'dayjs';

export function prettifyHeaderNames(name: string, displayLevel: boolean) {
  if (name.startsWith('labels.')) {
    return name.replace(/^labels\./, '');
  } else if (name === 'level' && !displayLevel) {
    return '\u200C';
  } else if (name === 'timestamp') {
    return 'date';
  } else if (name === 'body') {
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
  return options.map((opt) => String(opt.value));
}

export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}


export function timeAgo(timestamp: string) {
  const now = dayjs();
  const then = dayjs(timestamp);
  const diffInSeconds = now.diff(then, "second");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  }

  const diffInMinutes = now.diff(then, "minute");
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = now.diff(then, "hour");
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = now.diff(then, "day");
  return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
}

export function stringToDarkColor(str: string): string {
  // Simple hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Generate RGB values
  const r = (hash & 0xFF) % 100; // keep low for dark
  const g = ((hash >> 8) & 0xFF) % 100;
  const b = ((hash >> 16) & 0xFF) % 100;

  // Convert to hex
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
