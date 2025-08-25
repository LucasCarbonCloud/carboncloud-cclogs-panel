import React from 'react';
import { FieldSelector } from './Components';
import { Filter } from './Filter';
import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';


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
  const theme = useTheme2();

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
    <div
     className={clsx(
       'h-full overflow-y-scroll flex flex-col border-1 rounded-lg p-3',
       theme.isDark ? 'border-neutral-100/20' : 'border-neutral-100'
     )}
    >
      <p
        className={clsx(
          'h-2 font-semibold uppercase pb-5',
          theme.isDark ? 'text-neutral-400' : 'text-neutral-700'
        )}
      >Filters</p>
      <div
        className={clsx(
          'flex flex-col border-b-1',
          theme.isDark ? 'border-neutral-200/20' : 'border-neutral-200'
        )}
      >
        <Filter field={'logLevel'} showName="Log Level" />
        <Filter field={'app'} showName="app" />
        <Filter field={'component'} showName="component" />
        <Filter field={'team'} showName="team" />
      </div>
      <span>More filters will come here..</span>
      <p
        className={clsx(
          'h-2 font-semibold uppercase pt-5 pb-3',
          theme.isDark ? 'text-neutral-400' : 'text-neutral-700'
        )}
      >Settings</p>
      <FieldSelector field="Show level text" isChecked={showLevel} hidden={false} onChange={handleShowLevelChange} />
      <p
        className={clsx(
          'h-2 font-semibold uppercase pt-5 pb-3',
          theme.isDark ? 'text-neutral-400' : 'text-neutral-700'
        )}
      >Fields</p>
      <div className={`gap-1`}>
        {fields.map((field) => {
          return (
            <FieldSelector
              key={field}
              field={field}
              isChecked={selectedFields.includes(field)}
              hidden={false}
              onChange={handleFieldChange}
            />
          );
        })}
      </div>
      <p
        className={clsx(
          'h-2 font-semibold uppercase pt-5 pb-3',
          theme.isDark ? 'text-neutral-400' : 'text-neutral-700'
        )}
      >Labels</p>
      <div className={`gap-1`}>
        {labels.map((field) => {
          return (
            <FieldSelector
              key={field}
              field={field}
              isChecked={selectedLabels.includes(field)}
              hidden={false}
              onChange={handleLabelChange}
            />
          );
        })}
      </div>
    </div>
  );
};
