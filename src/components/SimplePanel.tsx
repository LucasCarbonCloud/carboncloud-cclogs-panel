import React, { useState } from 'react';
import { PanelProps, Field } from '@grafana/data';
import { SimpleOptions } from 'types';
import { PanelDataErrorView, getTemplateSrv, locationService } from '@grafana/runtime';
import '../style.js';
import { Table } from './Table';
import { Settings } from './Settings';

interface Props extends PanelProps<SimpleOptions> {}

import { Searchbar } from './Components';
import { Overview } from './Overview';

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const keys = ['level', 'timestamp', 'traceID', 'spanID', 'body'];

  const [selectedLabels, setSelectedLabels] = useState<string[]>(['labels.app', 'labels.component', 'labels.team']);
  const [selectedFields, setSelectedFields] = useState<string[]>(keys);
  const [showLevel, setShowLevel] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(getTemplateSrv().replace('$searchTerm'));

  if (data.series.length !== 1) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  // locationService.partial({ 'var-searchTerm': 'kube' }, true);

  const handleFieldChange = (value: string[], type: string) => {
    if (type === 'label') {
      setSelectedLabels(value);
    } else if (type === 'field') {
      setSelectedFields(value);
    }
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    locationService.partial({ 'var-searchTerm': value }, true);
  };

  // Get all variables

  // Get value of a specific variable (e.g. 'myVar')
  // const myVar = getTemplateSrv().getVariableValue('myQueryVar');

  // Access current value (e.g. selected option(s))
  // const currentValue = myVar?.global;

  // If it's a multi-value variable, it could be an array:
  // const selectedValues = Array.isArray(currentValue) ? currentValue : [currentValue];

  const fields = data.series[0].fields;
  // const keys = ['level', 'timestamp', 'traceID', 'spanID', 'body'];
  let labels: string[] = [];

  fields.forEach((field: Field) => {
    if (field.name === 'labels') {
      field.values.forEach((v) => {
        Object.keys(v).forEach((k: string) => {
          const fullK = 'labels.' + k;
          if (!labels.includes(fullK)) {
            labels.push(fullK);
          }
        });
      });
    }
  });

  // const apps = getOptionsForVariable('app');

  // locationService.partial({ 'var-app': ['beaker', 'pahtak'] }, true);

  const fieldsList = getFieldNames(keys, selectedFields, selectedLabels);
  labels = labels.sort();

  return (
    <div className={`flex h-full w-full gap-4 p-2`}>
      <div className="flex flex-col gap-4 px-2">
        <Overview fields={fields} />
        <Settings
          fields={keys}
          selectedFields={selectedFields}
          labels={labels}
          selectedLabels={selectedLabels}
          showLevel={showLevel}
          setShowLevel={setShowLevel}
          onChange={handleFieldChange}
        />
      </div>
      <div className="flex flex-col flex-grow gap-4 px-2">
        <Searchbar searchTerm={searchTerm} onChange={handleSearchTermChange} />
        <Table fields={fields} keys={fieldsList} showLevel={showLevel} />
      </div>
    </div>
  );
};

function getFieldNames(keys: string[], standardKeys: string[], labels: string[]): string[] {
  let outList: string[] = [];

  keys.forEach((k) => {
    if (standardKeys.includes(k)) {
      outList.push(k);
    }
  });

  if (outList.includes('body')) {
    return [...outList.filter((item) => item !== 'body'), ...labels, 'body'];
  }
  return [...outList, ...labels];
}
