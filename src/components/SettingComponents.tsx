import React from 'react';
import { prettifyHeaderNames } from './functions';

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
