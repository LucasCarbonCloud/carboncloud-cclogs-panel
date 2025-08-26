import React, { useState, useEffect } from 'react';
import { PanelProps, Field } from '@grafana/data';
import { SimpleOptions, Filter, FilterOperation } from 'types';
import { PanelDataErrorView, getTemplateSrv, locationService } from '@grafana/runtime';
import '../style.js';
import { Table } from './Table';
import { Settings } from './Settings';
import clsx from 'clsx';

interface Props extends PanelProps<SimpleOptions> {}

import { Searchbar } from './Components';
import { Overview } from './Overview';
import { LogDetails } from './LogDetails';


export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {

  const keys = ['level', 'timestamp', 'traceID', 'spanID', 'body'];

  const [selectedLabels, setSelectedLabels] = useState<string[]>(['labels.app', 'labels.component', 'labels.team']);
  const [selectedFields, setSelectedFields] = useState<string[]>(keys);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [showLevel, setShowLevel] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(getTemplateSrv().replace('$searchTerm'));

  const [logDetails, setLogDetails] = useState<number | undefined>(undefined);

  if (data.series.length !== 1) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

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

  const handleSetLogDetails = (row: number | undefined) => {
    if (logDetails == row) {
      setLogDetails(undefined)
      return
    }
    setLogDetails(row)
  };

  const handleSetFilterTerm = (
    key: string,
    operation: FilterOperation,
    value: any,
    op: "add" | "rm"
  ) => {
    setSelectedFilters(prevFilters => {
      if ( key == "timestamp" ) {
        return prevFilters
      }
      const exists = prevFilters.some(
        f => f.key === key && f.operation === operation && f.value === value
      );

      if (exists) {
        return prevFilters.filter(
          f => !(f.key === key && f.operation === operation && f.value === value)
        );
      } else {
        return [...prevFilters, { key, operation, value }];
      }
    });
  };

  const generateFilterString = (filters: Filter[]) => {
    let outStr = ""
    for (var i=0; i < filters.length; i++) {
      let key = filters[i].key
      let operation = filters[i].operation
      let value = filters[i].value

      if (key.startsWith("labels.")) {
        let logKey = key.split(".").slice(1).join(".");
        key = `LogAttributes['${logKey}']`
      }
      outStr += ` AND ( ${key} ${operation} '${value}' )`
    }
    return outStr
  };

  useEffect(() => {
    const filterString = generateFilterString(selectedFilters);
    locationService.partial({ 'var-filter_conditions': filterString}, true);
  }, [selectedFilters]);

  const fields = data.series[0].fields;
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

  const fieldsList = getFieldNames(keys, selectedFields, selectedLabels);
  labels = labels.sort();

  return (
<div className={`flex h-full w-full gap-4 p-2`}>
      <div
        className={clsx(
          'flex flex-col gap-4 px-2',
        )}
      >
        <Overview fields={fields} />
        <Settings
          fields={keys}
          selectedFields={selectedFields}
          labels={labels}
          selectedLabels={selectedLabels}
          showLevel={showLevel}
          setShowLevel={setShowLevel}
          onChange={handleFieldChange}
          selectedFilters={selectedFilters}
          setSelectedFilters={handleSetFilterTerm}
        />
      </div>
      <div className="flex flex-col flex-grow gap-4 px-2">
        <Searchbar searchTerm={searchTerm} onChange={handleSearchTermChange} />
        <Table options={options} fields={fields} keys={fieldsList} showLevel={showLevel} setSelectedFilters={handleSetFilterTerm} setLogDetails={handleSetLogDetails} />
      </div>
        {logDetails != undefined && <LogDetails fields={fields} rowIndex={logDetails}/>}
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
