import React from 'react';
import { prettifyHeaderNames } from './functions';
import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';

export interface TableHeaderProps {
  keys: string[];
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  showLevel: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ keys, sortField, sortDirection, onSort, showLevel }) => {
  const theme = useTheme2();
  return (
    <thead
      className={clsx(
        'sticky top-0 z-10 w-full uppercase',
        theme.isDark ? 'bg-[#111217]' : 'bg-white'
      )}
    >

      <tr className="w-full">
        {keys.map((key) => (
          <th
            // className={`${key === 'body' ? `` : ``} cursor-pointer hover:bg-gray-50 select-none`}
            className={clsx(
              'cursor-pointer select-none',
              theme.isDark ? 'hover:bg-gray-50/20' : 'hover:bg-gray-50'
            )}
            key={key}
            style={{ maxWidth: '100%' }}
            onClick={() => onSort(key)}
          >
            <div
                 className={clsx(
                   'flex justify-start items-center px-4 border-b-1',
                   theme.isDark ? 'border-neutral-300/20' : 'border-neutral-300'
                 )}
            >
              {sortField === key && <span className="mr-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
              <span>{prettifyHeaderNames(key, showLevel)}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
