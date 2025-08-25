import React, { useState, useEffect } from 'react';
import { prettifyHeaderNames } from './functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';

export interface FieldSelectorProps {
  field: string;
  isChecked: boolean;
  hidden: boolean;
  onChange: (field: string) => void;
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({ field, isChecked, hidden, onChange }) => {
  return (
    <div className={`w-full flex gap-2 ${hidden && `hidden`}`}>
      <input type="checkbox" value={field} checked={isChecked} onChange={() => onChange(field)} />
      <label key={field}>{prettifyHeaderNames(field, true)}</label>
    </div>
  );
};

export interface SearchbarProps {
  searchTerm: string;
  onChange: (field: string) => void;
}

export const Searchbar: React.FC<SearchbarProps> = ({ searchTerm, onChange }) => {
  const [localValue, setLocalValue] = useState(searchTerm);

  const theme = useTheme2();

  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div
      className={clsx(
        'flex items-center w-full rounded-lg border-1',
        theme.isDark ? 'border-neutral-200/20' : 'border-neutral-200'
      )}
    >
      <div
        className={clsx(
          'flex items-center px-4 h-full rounded-l-lg',
          theme.isDark ? 'bg-neutral-200/20' : 'bg-neutral-200'
        )}
      >

        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input
        className="flex-grow p-3 rounded-xl"
        style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}
        type="text"
        placeholder="Filter your logs"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
};
