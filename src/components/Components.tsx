import React, { useState, useEffect } from 'react';
import { prettifyHeaderNames } from './functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
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

export interface NumberInputProps {
  name: string;
  value: number;
  maxValue: number;
  minValue: number;
  step: number;
  hidden: boolean;
  onChange: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ name, value, maxValue, minValue, step, hidden, onChange }) => {
  const handleValueChange = (op: string) => {
    let v = value;
    if (op === "+") {
      v = v+step
    } else {
      v = v-step
    }

    if (v < minValue || v > maxValue) {
      return
    }

    onChange(v)
  };

  return (
    <div className={`w-full flex gap-2 justify-between ${hidden && `hidden`}`}>
      <span>{name}</span>
    <div className={`flex gap-2 items-center`}>
        <span>{value}</span>
        <div className={clsx(
          `text-neutral-300 flex gap-1 items-center`
           )}>
          <FontAwesomeIcon icon={faMinusCircle} className={clsx(
            `hover:text-neutral-500`
           )} onClick={() => handleValueChange("-")}/>
          <FontAwesomeIcon icon={faPlusCircle} className={clsx(
            `hover:text-neutral-500`
           )} onClick={() => handleValueChange("+")} />
        </div>
      </div>
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
