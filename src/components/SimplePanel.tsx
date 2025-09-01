import React, { useState, useEffect } from 'react';
import { PanelProps, Field } from '@grafana/data';
import { SimpleOptions, Filter, FilterOperation } from 'types';
import { PanelDataErrorView, getTemplateSrv, locationService } from '@grafana/runtime';
import '../style.js';
import { Table } from './Table';
import { Settings } from './Settings';
import clsx from 'clsx';

interface Props extends PanelProps<SimpleOptions> {}

import { Searchbar } from './Searchbar';
import { Overview } from './Overview';
import { LogDetails } from './LogDetails';
import { generateFilterString, parseFilterString, parseSelectedKeys } from './functions';

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const keys = ['level', 'timestamp', 'traceID', 'spanID', 'body'];

  const [selectedLabels, setSelectedLabels] = useState<string[]>(parseSelectedKeys(getTemplateSrv().replace('$selectedLabels')));
  const [selectedFields, setSelectedFields] = useState<string[]>(parseSelectedKeys(getTemplateSrv().replace('$selectedKeys')));
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>(parseFilterString(getTemplateSrv().replace('$filter_conditions')));
  const [showLevel, setShowLevel] = useState<boolean>(false);
  const [tableLineHeight, setTableLineHeight] = useState<number>(Number(getTemplateSrv().replace('$tableLineHeight')));
  const [searchTerm, setSearchTerm] = useState<string>(getTemplateSrv().replace('$searchTerm'));

  const [logDetails, setLogDetails] = useState<number | undefined>(undefined);

  useEffect(() => {
    const filterString = generateFilterString(selectedFilters);
    locationService.partial({ 'var-filter_conditions': filterString }, true);
  }, [selectedFilters]);

  if (data.series.length !== 1) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const handleFieldChange = (value: string[], type: string) => {
    if (type === 'label') {
      setSelectedLabels(value);
      locationService.partial({ 'var-selectedLabels': value.join(",") }, true);
    } else if (type === 'field') {
      setSelectedFields(value);
      locationService.partial({ 'var-selectedKeys': value.join(",") }, true);
    }
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    // remove @... tokens (and trailing space if any)
    const filteredVal = value.replace(/#\S*\s?/g, "").trim();

    locationService.partial({ "var-searchTerm": filteredVal }, true);
  };

  const handleTableLineHeight= (value: number) => {
    setTableLineHeight(value);
    locationService.partial({ 'var-tableLineHeight': value }, true);
  };

  const handleSetLogDetails = (row: number | undefined) => {
    if (logDetails === row) {
      setLogDetails(undefined);
      return;
    }
    setLogDetails(row);
  };

  const handleSetFilterTerm = (key: string, operation: FilterOperation, value: any, op: 'add' | 'rm') => {
    setSelectedFilters((prevFilters) => {
      if (key === 'timestamp') {
        return prevFilters;
      }
      const exists = prevFilters.some((f) => f.key === key && f.operation === operation && f.value === value);

      if (exists) {
        return prevFilters.filter((f) => !(f.key === key && f.operation === operation && f.value === value));
      } else {
        return [...prevFilters, { key, operation, value }];
      }
    });
  };


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
    <div className={`flex h-full w-full gap-4 relative`}>
      <div className={clsx('flex flex-col gap-4 px-2 m-2')}>
        <Overview fields={fields} />
        <Settings
          fields={keys}
          selectedFields={selectedFields}
          labels={labels}
          selectedLabels={selectedLabels}
          showLevel={showLevel}
          setShowLevel={setShowLevel}
          tableLineHeight={tableLineHeight}
          setTableLineHeight={handleTableLineHeight}
          onChange={handleFieldChange}
        />
      </div>
      <div className="flex flex-col flex-grow gap-4 px-2 m-2">
        <Searchbar
          searchTerm={searchTerm}
          fields={fields}
          labels={[...keys, ...labels]}
          onChange={handleSearchTermChange}
          selectedFilters={selectedFilters}
          setSelectedFilters={handleSetFilterTerm}
        />
        <Table
          options={options}
          fields={fields}
          keys={fieldsList}
          showLevel={showLevel}
          lineHeight={tableLineHeight}
          setSelectedFilters={handleSetFilterTerm}
          setLogDetails={handleSetLogDetails}
        />
      </div>
      {logDetails !== undefined && <LogDetails options={options} fields={fields} rowIndex={logDetails} setLogDetails={handleSetLogDetails} />}
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
