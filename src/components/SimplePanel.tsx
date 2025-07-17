import React, { useState, useMemo } from 'react';
import { PanelProps, Field } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';
import '../style.js';
import { TableData, TableDataProps } from './TableData';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const [sortField, setSortField] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (data.series.length !== 1) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const fields = data.series[0].fields;
  const rowCount = fields[0].values.length;
  const keys = ['level', 'timestamp', 'traceID', 'spanID', 'labels.app', 'labels.team', 'body'];

  const sortedRowIndices = useMemo(() => {
    const keyIndexMap = fields.reduce((acc, field, idx) => {
      acc[field.name] = idx;
      return acc;
    }, {} as { [key: string]: number });

    const sortFieldIndex = keyIndexMap[sortField];
    if (sortFieldIndex === undefined) {
      return Array.from({ length: rowCount }, (_, i) => i);
    }

    const indices = Array.from({ length: rowCount }, (_, i) => i);
    return indices.sort((a, b) => {
      const aValue = fields[sortFieldIndex].values[a];
      const bValue = fields[sortFieldIndex].values[b];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [fields, sortField, sortDirection, rowCount]);

  const TableRowWithKeys = createTableRow(keys, fields);

  return (
    <div className="overflow-scroll w-full h-full" style={{ contain: 'strict' }}>
      <table className="w-full border-x-1 border-neutral-200 table-spacing" style={{ borderSpacing: '0.75rem' }}>
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
        />
        <tbody className="border-spacing-4">
          {sortedRowIndices.map((rowIndex) => (
            <TableRowWithKeys key={rowIndex} rowIndex={rowIndex} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface TableHeaderProps {
  keys: string[];
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ keys, sortField, sortDirection, onSort }) => {
  const displayLevel = false;
  return (
    <thead className="sticky top-0 z-10 w-full uppercase bg-white border-b-1 border-neutral-200">
      <tr className="w-full">
        {keys.map((key) => (
          <th
            className={`${key == 'body' ? `` : ``} cursor-pointer hover:bg-gray-50 select-none`}
            key={key}
            style={{ maxWidth: '100%' }}
            onClick={() => onSort(key)}
          >
            <div className="flex justify-start items-center px-4">
              {sortField === key && <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
              <span>{key == 'level' ? (displayLevel ? key : ``) : key}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

interface TableRowProps {
  rowIndex: number;
}

const createTableRow = (keys: string[], fields: any[]) => {
  const keyIndexMap = fields.reduce((acc, field, idx) => {
    acc[field.name] = idx;
    return acc;
  }, {} as { [key: string]: number });

  const TableRowWithKeys: React.FC<TableRowProps> = ({ rowIndex }) => {
    const rowData = keys.map((key: string) => {
      if (key.startsWith('labels.')) {
        const colIdx = keyIndexMap['labels'];
        return fields[colIdx].values[rowIndex];
      }
      const colIdx = keyIndexMap[key];
      return fields[colIdx].values[rowIndex];
    });

    return (
      <tr className={`border-b-neutral-200 border-b-1 `}>
        {rowData.map((value, idx) => (
          <TableData key={keys[idx]} columnName={keys[idx]} value={value} level={''} />
        ))}
      </tr>
    );
  };

  return TableRowWithKeys;
};

function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}
