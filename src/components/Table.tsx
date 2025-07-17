import React, { useState, useMemo } from 'react';
import { Field } from '@grafana/data';
import { createTableRow } from './TableRow';
import { TableHeader } from './TableHeader';

export interface TableProps {
  fields: Field[];
  keys: string[];
  showLevel: boolean;
  // columnName: string;
  // value: any;
  // level: string;
}

export const Table: React.FC<TableProps> = ({ fields, keys, showLevel }) => {
  const [sortField, setSortField] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (fields.length == 0) return;
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
        const labelKey = sortField.split('.')[1];
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

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [fields, sortField, sortDirection, rowCount]);

  const TableRowWithKeys = createTableRow(keys, fields);

  return (
    <div className="overflow-scroll flex-grow w-full h-full" style={{ contain: 'strict' }}>
      <table
        className="w-full rounded-lg border-x-1 border-neutral-200 table-spacing"
        style={{ borderSpacing: '0.75rem' }}
      >
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
