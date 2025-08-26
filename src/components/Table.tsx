import React, { useState, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Field } from '@grafana/data';
import { createTableRow } from './TableRow';
import { prettifyHeaderNames } from './functions';

import { SimpleOptions, FilterOperation } from 'types';

import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';

export interface TableProps {
  options: SimpleOptions;
  fields: Field[];
  keys: string[];
  showLevel: boolean;
  setSelectedFilters: (
    key: string,
    operation: FilterOperation,
    value: any,
    op: "add" | "rm"
  ) => void;
  // columnName: string;
  // value: any;
  // level: string;
}

const ITEM_HEIGHT = 40;
const MAX_VISIBLE_ROWS = 1000;

export const Table: React.FC<TableProps> = ({ options, fields, keys, showLevel, setSelectedFilters }) => {
  const theme = useTheme2();
  const [sortField, setSortField] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (fields.length === 0) {
    return null;
  }
  const rowCount = fields[0].values.length;

  const keyIndexMap = useMemo(() => {
    return fields.reduce((acc, field, idx) => {
      acc[field.name] = idx;
      return acc;
    }, {} as { [key: string]: number });
  }, [fields]);

  const sortedRowIndices = useMemo(() => {
    const indices = Array.from({ length: Math.min(rowCount, MAX_VISIBLE_ROWS) }, (_, i) => i);

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
  }, [fields, sortField, sortDirection, rowCount, keyIndexMap]);

  const TableRowWithKeys = useMemo(() => {
    return createTableRow(options, keys, fields, setSelectedFilters);
  }, [options, keys, fields, setSelectedFilters]);

  const columnWidths = useMemo(() => {
    const baseWidths: { [key: string]: string } = {
      'level': showLevel ? 'minmax(80px, auto)' : 'minmax(20px, auto)',
      'timestamp': 'minmax(180px, auto)',
      'traceID': 'minmax(200px, auto)', 
      'spanID': 'minmax(120px, auto)',
      'body': 'minmax(300px, 1fr)'
    };
    
    return keys.map(key => {
      if (key.startsWith('labels.')) return 'minmax(120px, auto)';
      return baseWidths[key] || 'minmax(120px, auto)';
    }).join(' ');
  }, [keys, showLevel]);

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const rowIndex = sortedRowIndices[index];
    return (
      <div 
        className={clsx(
          'hover-row cursor-pointer border-b-1 text-sm transition-colors duration-150',
          theme.isDark 
            ? 'border-b-neutral-200/20 hover:bg-neutral-50/10' 
            : 'border-b-neutral-200 hover:bg-neutral-50'
        )}
        style={{
          ...style, 
          display: 'grid',
          gridTemplateColumns: columnWidths,
          gap: '0.75rem',
          alignItems: 'stretch',
          padding: '0 0.75rem',
          minHeight: ITEM_HEIGHT
        }}
      >
        <TableRowWithKeys key={rowIndex} rowIndex={rowIndex} showLabel={showLevel} />
      </div>
    );
  }, [TableRowWithKeys, sortedRowIndices, showLevel, columnWidths, theme]);

  const containerHeight = Math.min(sortedRowIndices.length * ITEM_HEIGHT + 60, 600);

  return (
    <div
      className={clsx(
        'flex-grow w-full h-full rounded-lg border-1 flex flex-col',
        theme.isDark ? 'border-neutral-100/20' : 'border-neutral-200'
      )}
      style={{ contain: 'strict' }}
    >
      <div 
        className="flex-shrink-0 sticky top-0 z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: columnWidths,
          gap: '0.75rem',
          padding: '0.75rem',
          borderBottom: `1px solid ${theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        {keys.map((key) => (
          <div
            key={key}
            className={clsx(
              'cursor-pointer select-none uppercase font-semibold text-sm flex items-center min-w-0 px-2 py-1 rounded transition-colors duration-150',
              theme.isDark 
                ? 'hover:bg-gray-50/20 bg-[#111217]' 
                : 'hover:bg-gray-50 bg-white'
            )}
            onClick={() => {
              if (key === sortField) {
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
              } else {
                setSortField(key);
                setSortDirection('asc');
              }
            }}
          >
            {sortField === key && <span className="mr-1 flex-shrink-0">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            <span className="truncate">{prettifyHeaderNames(key, showLevel)}</span>
          </div>
        ))}
      </div>
      <div className="flex-grow overflow-hidden">
        <List
          height={containerHeight - 60}
          itemCount={sortedRowIndices.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
};
