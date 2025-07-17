import React, { useState } from 'react';
import { PanelProps, Field } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';
import '../style.js';
import { Table } from './Table';
import { Settings } from './Settings';
import { getTemplateSrv } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  if (data.series.length !== 1) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }
  console.log(getTemplateSrv().replace('$searchTerm'));

  const keys = ['level', 'timestamp', 'traceID', 'spanID', 'body'];

  const [selectedLabels, setSelectedLabels] = useState<string[]>(['labels.app', 'labels.component', 'labels.team']);
  const [selectedFields, setSelectedFields] = useState<string[]>(keys);
  const [showLevel, setShowLevel] = useState<boolean>(false);

  const handleFieldChange = (value: string[], type: string) => {
    if (type == 'label') {
      setSelectedLabels(value);
    } else if (type == 'field') {
      setSelectedFields(value);
    }
  };

  const fields = data.series[0].fields;
  // const keys = ['level', 'timestamp', 'traceID', 'spanID', 'body'];
  let labels: string[] = [];

  fields.forEach((field: Field) => {
    if (field.name == 'labels') {
      field.values.forEach((v) => {
        Object.keys(v).forEach((k: string) => {
          const fullK = 'labels.' + k;
          if (!labels.includes(fullK)) labels.push(fullK);
        });
      });
    }
  });

  const fieldsList = getFieldNames(keys, selectedFields, selectedLabels);
  labels = labels.sort();

  return (
    <div className={`flex h-full w-full gap-4`}>
      <Settings
        fields={keys}
        selectedFields={selectedFields}
        labels={labels}
        selectedLabels={selectedLabels}
        showLevel={showLevel}
        setShowLevel={setShowLevel}
        onChange={handleFieldChange}
      />
      <Table fields={fields} keys={fieldsList} showLevel={showLevel} />
    </div>
  );
};

function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

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
