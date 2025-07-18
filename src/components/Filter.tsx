import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faFilter, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FieldSelector } from './Components';
import { locationService } from '@grafana/runtime';
import { getOptionsForVariable, getValuesForVariable } from './functions';

export interface FilterProps {
  field: string;
  showName: string;
  // isChecked: boolean;
  // onChange: (field: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ field, showName }) => {
  const options = getOptionsForVariable(field);
  const selected = getValuesForVariable(field);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);

  const onClick = () => {
    setOpen(!open);
  };

  const handleFieldChange = (value: string, op?: string) => {
    if (op === 'only') {
      setSelectedOptions([value]);
      locationService.partial({ [`var-${field}`]: [value] }, true);
      return;
    }
    const newSelected = selectedOptions.includes(value)
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelected);

    locationService.partial({ [`var-${field}`]: newSelected }, true);
  };

  const resetOptions = () => {
    setSelectedOptions(options);
    locationService.partial({ [`var-${field}`]: ['All'] }, true);
  };

  return (
    <div className="flex flex-col py-2 select-none border-t-1 border-neutral-200">
      <div className={`w-full flex items-center justify-between`}>
        <div className="cursor-pointer" onClick={() => onClick()}>
          <FontAwesomeIcon className="w-6" icon={open ? faChevronDown : faChevronRight} />
          <span className="font-semibold uppercase">{showName}</span>
        </div>
        {selectedOptions.length > 0 && (
          <div className="flex items-center text-neutral-400">
            <span>
              {selectedOptions.length} of {options.length}
            </span>
            <FontAwesomeIcon
              className="p-2 cursor-pointer text-neutral-300"
              icon={faCircleXmark}
              onClick={resetOptions}
            />
          </div>
        )}
      </div>
      {open && (
        <FilterContent options={options} selectedOptions={selectedOptions} handleFieldChange={handleFieldChange} />
      )}
    </div>
  );
};

interface FilterContentProps {
  options: string[];
  selectedOptions: string[];
  handleFieldChange: (option: string, op?: string) => void;
  // field: string;
  // isChecked: boolean;
  // onChange: (field: string) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({ options, selectedOptions, handleFieldChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [open, setOpen] = useState<boolean>(false);

  const resetSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <div className={`w-full flex flex-col mt-2`}>
      <div className="flex relative items-center mb-2 rounded-md border-neutral-200 border-1">
        <div className="flex items-center px-2 h-full rounded-l-lg text-neutral-400">
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <input
          className="flex-grow p-1 pr-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
        />
        <FontAwesomeIcon
          className="absolute right-0 p-2 cursor-pointer text-neutral-300"
          icon={faCircleXmark}
          onClick={resetSearchTerm}
        />
      </div>
      <div>
        {options.map((o) => {
          return (
            <div
              key={o}
              className={`w-full flex hover:bg-neutral-100 ${
                searchTerm !== '' && !o.toLowerCase().startsWith(searchTerm.toLowerCase()) && `hidden`
              }`}
            >
              <FieldSelector
                field={o}
                isChecked={selectedOptions.includes(o)}
                hidden={searchTerm !== '' && !o.toLowerCase().startsWith(searchTerm.toLowerCase())}
                onChange={handleFieldChange}
              />
              <div
                onClick={() => handleFieldChange(o, 'only')}
                className="flex items-center px-1 text-xs align-middle rounded-xl cursor-pointer text-neutral-400 hover:bg-neutral-200"
              >
                <span>only</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
