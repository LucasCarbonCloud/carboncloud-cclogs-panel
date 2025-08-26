import React from 'react';
import { FieldSelector } from './Components';
import { Filter as FilterCmp } from './Filter';
import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';
import { Filter, FilterOperation } from 'types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


export interface SettingsProps {
  fields: string[];
  selectedFields: string[];
  labels: string[];
  selectedLabels: string[];
  showLevel: boolean;
  setShowLevel: (showLevel: boolean) => void;
  onChange: (selected: string[], changeType: string) => void;
  selectedFilters: Filter[];
  setSelectedFilters: (
    key: string,
    operation: FilterOperation,
    value: any,
    op: "add" | "rm"
  ) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  fields,
  selectedFields,
  labels,
  selectedLabels,
  showLevel,
  setShowLevel,
  onChange,
  selectedFilters,
  setSelectedFilters
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
        <FilterCmp field={'logLevel'} showName="Log Level" />
        <FilterCmp field={'app'} showName="app" />
        <FilterCmp field={'component'} showName="component" />
        <FilterCmp field={'team'} showName="team" />
      </div>
      <div className="flex flex-col gap-2 p-2 my-2 w-80">
        {selectedFilters.map((filter) => (
          <div
            key={`${filter.key}-${filter.operation}-${filter.value}`}
            className="flex items-center py-1 px-2 w-full text-white bg-teal-700 rounded-md"
            title={`${filter.key} ${filter.operation} ${filter.value}`}
          >
            <span className="flex-grow truncate">
              {filter.key} {filter.operation} {filter.value}
            </span>
            <FontAwesomeIcon
              className="ml-2 cursor-pointer hover:text-neutral-300"
              icon={faCircleXmark}
                      onClick={() => setSelectedFilters(filter.key, filter.operation, filter.value, "rm")}
            />
          </div>
        ))}
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
