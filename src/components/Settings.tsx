import React, { useState, useMemo } from 'react';
import { FieldSelector } from './Components';

export interface SettingsProps {
  fields: string[];
  selectedFields: string[];
  labels: string[];
  selectedLabels: string[];
  showLevel: boolean;
  setShowLevel: (showLevel: boolean) => void;
  onChange: (selected: string[], changeType: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  fields,
  selectedFields,
  labels,
  selectedLabels,
  showLevel,
  setShowLevel,
  onChange,
}) => {
  const handleLabelChange = (value: string) => {
    const newSelected = selectedLabels.includes(value)
      ? selectedLabels.filter((v) => v !== value)
      : [...selectedLabels, value];
    onChange(newSelected, 'label');
  };

  const handleFieldChange = (value: string) => {
    const newSelected = selectedFields.includes(value)
      ? selectedFields.filter((v) => v !== value)
      : [...selectedFields, value];
    onChange(newSelected, 'field');
  };

  const handleShowLevelChange = (value: string) => {
    setShowLevel(!showLevel);
  };

  return (
    <div className={`h-full overflow-y-scroll flex flex-col border-1 rounded-lg p-3 border-neutral-100`}>
      <p className={`h-2 font-semibold uppercase text-neutral-700 pb-5`}>Settings</p>
      <div className={`flex flex-col`}>
        <FieldSelector field="Show Level" isChecked={showLevel} onChange={handleShowLevelChange} />
        <p className={`h-2 font-semibold uppercase text-neutral-500 pt-3 pb-2`}>Fields</p>
        <div className={`pl-2 gap-1`}>
          {fields.map((field) => {
            return (
              <FieldSelector field={field} isChecked={selectedFields.includes(field)} onChange={handleFieldChange} />
            );
          })}
          <p className={`h-2 font-semibold uppercase text-neutral-400 pt-3 pb-2 `}>Labels</p>
          <div className={`pl-2 gap-1`}>
            {labels.map((field) => {
              return (
                <FieldSelector field={field} isChecked={selectedLabels.includes(field)} onChange={handleLabelChange} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
