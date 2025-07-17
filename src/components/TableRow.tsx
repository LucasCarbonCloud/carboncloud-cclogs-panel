import React from 'react';
import { TableData } from './TableData';

export interface TableRowProps {
  rowIndex: number;
  showLabel: boolean;
}

export const createTableRow = (keys: string[], fields: any[]) => {
  const keyIndexMap = fields.reduce((acc, field, idx) => {
    acc[field.name] = idx;
    return acc;
  }, {} as { [key: string]: number });

  const TableRowWithKeys: React.FC<TableRowProps> = ({ rowIndex, showLabel }) => {
    const rowData = keys.map((key: string) => {
      if (key.startsWith('labels.')) {
        const colIdx = keyIndexMap['labels'];
        return fields[colIdx].values[rowIndex];
      }
      const colIdx = keyIndexMap[key];
      return fields[colIdx].values[rowIndex];
    });

    return (
      <tr className={`border-b-neutral-200 border-b-1 hover:bg-neutral-50`}>
        {rowData.map((value, idx) => (
          <TableData key={keys[idx]} columnName={keys[idx]} value={value} displayLevel={showLabel} />
        ))}
      </tr>
    );
  };

  return TableRowWithKeys;
};
