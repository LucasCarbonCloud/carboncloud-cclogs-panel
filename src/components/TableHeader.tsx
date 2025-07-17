import React from 'react';
import { prettifyHeaderNames } from './functions';

export interface TableHeaderProps {
  keys: string[];
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  showLevel: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ keys, sortField, sortDirection, onSort, showLevel }) => {
  return (
    <thead className="sticky top-0 z-10 w-full uppercase bg-white border-b-1 border-neutral-800">
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
              <span>{prettifyHeaderNames(key, showLevel)}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
