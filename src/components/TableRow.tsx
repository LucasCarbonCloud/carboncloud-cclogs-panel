import React, { useState } from 'react';
import { TableData } from './TableData';

import { SimpleOptions, FilterOperation } from 'types';
import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';

export interface TableRowProps {
  rowIndex: number;
  showLabel: boolean;
}

export const createTableRow = (options: SimpleOptions, keys: string[], fields: any[], setSelectedFilters: (
    key: string,
    operation: FilterOperation,
    value: any,
    op: "add" | "rm"
  ) => void) => {

  const keyIndexMap = fields.reduce((acc, field, idx) => {
    acc[field.name] = idx;
    return acc;
  }, {} as { [key: string]: number });

  const TableRowWithKeys: React.FC<TableRowProps> = ({ rowIndex, showLabel }) => {
    const theme = useTheme2();
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const onClick = () => {
      setShowDetails(!showDetails);
    };

    const rowData = keys.map((key: string) => {
      if (key.startsWith('labels.')) {
        const colIdx = keyIndexMap['labels'];
        return fields[colIdx].values[rowIndex];
      }
      const colIdx = keyIndexMap[key];
      return fields[colIdx].values[rowIndex];
    });

    return (
      <>
        <tr
          className={clsx(
            'cursor-default border-b-1 hover:bg-neutral-50 text-sm',
            theme.isDark ? 'border-b-neutral-200/20 hover:bg-neutral-50/20' : 'border-b-neutral-200 hover:bg-neutral-50'
          )}
          onClick={onClick}
        >
          {rowData.map((value, idx) => (
            <TableData options={options} key={keys[idx]} columnName={keys[idx]} value={value} displayLevel={showLabel} setSelectedFilters={setSelectedFilters}/>
          ))}
        </tr>
      </>
    );
  };

  return TableRowWithKeys;
};
