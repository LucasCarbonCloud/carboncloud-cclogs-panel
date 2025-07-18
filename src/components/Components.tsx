import React, { useState, useEffect } from 'react';
import { prettifyHeaderNames } from './functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export interface FieldSelectorProps {
  field: string;
  isChecked: boolean;
  onChange: (field: string) => void;
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({ field, isChecked, onChange }) => {
  return (
    <div className={`w-full flex gap-2`}>
      <input type="checkbox" value={field} checked={isChecked} onChange={() => onChange(field)} />
      <label key={field}>{prettifyHeaderNames(field, true)}</label>
    </div>
  );
};

export interface SearchbarProps {
  // field: string;
  // isChecked: boolean;
  searchTerm: string;
  onChange: (field: string) => void;
}

export const Searchbar: React.FC<SearchbarProps> = ({ searchTerm, onChange }) => {
  const [localValue, setLocalValue] = useState(searchTerm);

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
    <div className="flex items-center w-full rounded-lg border-1 border-neutral-200">
      <div className="flex items-center px-4 h-full rounded-l-lg bg-neutral-200">
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
