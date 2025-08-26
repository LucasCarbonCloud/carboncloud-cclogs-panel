import React, { useState, useMemo } from 'react';
import { TableData } from './TableData';
import { LogDetails } from './LogDetails';

import { SimpleOptions, FilterOperation } from 'types';
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

  const TableRowWithKeys: React.FC<TableRowProps> = React.memo(function TableRowWithKeys({ rowIndex, showLabel }) {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const onClick = () => {
      setShowDetails(!showDetails);
    };

    const rowData = useMemo(() => {
      return keys.map((key: string) => {
        if (key.startsWith('labels.')) {
          const colIdx = keyIndexMap['labels'];
          return fields[colIdx].values[rowIndex];
        }
        const colIdx = keyIndexMap[key];
        return fields[colIdx].values[rowIndex];
      });
    }, [rowIndex]);

    return (
      <>
        {rowData.map((value, idx) => (
          <div 
            key={keys[idx]}
            className={clsx(
              'text-sm font-mono h-full group flex items-center min-w-0 px-2 py-1',
              'transition-colors duration-150'
            )}
            onClick={onClick}
          >
            <TableData 
              options={options} 
              columnName={keys[idx]} 
              value={value} 
              displayLevel={showLabel} 
              setSelectedFilters={setSelectedFilters}
            />
          </div>
        ))}
        {showDetails && (
          <div className="col-span-full mt-2">
            <LogDetails fields={fields} rowIndex={rowIndex} />
          </div>
        )}
      </>
    );
  });

  TableRowWithKeys.displayName = 'TableRowWithKeys';
  return TableRowWithKeys;
};
