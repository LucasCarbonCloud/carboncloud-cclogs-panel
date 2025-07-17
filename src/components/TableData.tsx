import React from 'react';
import dayjs from 'dayjs';

export interface TableDataProps {
  columnName: string;
  value: any;
  level: string;
}

export const TableData: React.FC<TableDataProps> = ({ columnName, value, level }) => {
  let displayValue = value;
  let pClass = 'px-4';

  // This should be a global var somehow
  const displayLevel = false;
  // const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSS';
  const dateFormat = 'MMM DD HH:mm:ss.SSS';

  if (columnName == 'timestamp') {
    // displayValue = formatTimestamp(value);
    displayValue = dayjs(value).format(dateFormat);
  } else if (columnName == 'level') {
    let color;
    switch (value) {
      case 'INFO':
        color = 'bg-green-500';
        break;
      case 'WARNING':
        color = 'bg-yellow-500';
        break;
      case 'ERROR':
        color = 'bg-red-500';
        break;
      case 'FATAL':
        color = 'bg-purple-500';
        break;
      default:
        color = 'bg-gray-500';
    }
    pClass = `mr-1 ml-1 min-h-[1.5rem] ${color} `;
    if (!displayLevel) {
      pClass += 'w-1.5 rounded-full';
      displayValue = ``;
    } else {
      pClass += 'rounded-lg px-1';
    }
    // flex = 'flex';
    // displayValue = ``;
  } else if (columnName == 'body') {
    // displayValue = truncateString(value, 140);
  } else if (columnName.startsWith('labels.')) {
    displayValue = value[columnName.replace(/^labels\./, '')];
    if (displayValue == undefined) {
      displayValue = '';
    }
  }

  return (
    <td className={`font-mono h-full text-nowrap`} style={{ paddingBottom: '4px', paddingTop: '4px' }}>
      {/*return a div with string h in it if columnName == timestamp*/}
      <div className={pClass}>{String(displayValue)}</div>
    </td>
  );
};

const getJsonParam = (field: string, jsonString: string): string => {
  try {
    const data: Record<string, any> = JSON.parse(jsonString);
    return data[field] ?? '';
  } catch (e) {
    return '';
  }
};
