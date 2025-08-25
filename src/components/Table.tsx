import React, { useState, useMemo } from 'react';
import { Field } from '@grafana/data';
import { createTableRow } from './TableRow';
import { TableHeader } from './TableHeader';

import { SimpleOptions } from 'types';

import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';

export interface TableProps {
  options: SimpleOptions;
  fields: Field[];
  keys: string[];
  showLevel: boolean;
  // columnName: string;
  // value: any;
  // level: string;
}

export const Table: React.FC<TableProps> = ({ options, fields, keys, showLevel }) => {
  const theme = useTheme2();

  const [sortField, setSortField] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (fields.length === 0) {
    return;
  }
  const rowCount = fields[0].values.length;

  const sortedRowIndices = useMemo(() => {
    const keyIndexMap = fields.reduce((acc, field, idx) => {
      acc[field.name] = idx;
      return acc;
    }, {} as { [key: string]: number });

    const indices = Array.from({ length: rowCount }, (_, i) => i);

    return indices.sort((a, b) => {
      let aValue, bValue;

      if (sortField.startsWith('labels.')) {
        const labelKey = sortField.substring(7);
        const labelsFieldIndex = keyIndexMap['labels'];
        if (labelsFieldIndex !== undefined) {
          const aLabels = fields[labelsFieldIndex].values[a] || {};
          const bLabels = fields[labelsFieldIndex].values[b] || {};
          aValue = aLabels[labelKey] || '';
          bValue = bLabels[labelKey] || '';
        } else {
          aValue = '';
          bValue = '';
        }
      } else {
        const sortFieldIndex = keyIndexMap[sortField];
        if (sortFieldIndex === undefined) {
          return 0;
        }
        aValue = fields[sortFieldIndex].values[a];
        bValue = fields[sortFieldIndex].values[b];
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [fields, sortField, sortDirection, rowCount]);

  const TableRowWithKeys = createTableRow(options, keys, fields);

  return (
    <div
      className={clsx(
        'overflow-scroll flex-grow w-full h-full rounded-lg border-1',
        theme.isDark ? 'border-neutral-100/20' : 'border-neutral-200'
      )}
      style={{ contain: 'strict' }}
    >
      <table className="w-full rounded-lg table-spacing" style={{ borderSpacing: '0.75rem' }}>
        <TableHeader
          keys={keys}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={(field) => {
            if (field === sortField) {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
            } else {
              setSortField(field);
              setSortDirection('asc');
            }
          }}
          showLevel={showLevel}
        />
        <tbody className="border-spacing-4">
          {sortedRowIndices.map((rowIndex) => (
            <TableRowWithKeys key={rowIndex} rowIndex={rowIndex} showLabel={showLevel} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
