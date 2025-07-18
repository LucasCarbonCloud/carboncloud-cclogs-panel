import { Field } from '@grafana/data';
import React from 'react';

export interface LogDetailsProps {
  fields: Field[];
  rowIndex: number;
}

export const LogDetails: React.FC<LogDetailsProps> = ({ fields, rowIndex }) => {
  let keyVals: { [key: string]: string } = {};
  let labelVals: { [key: string]: string } = {};

  fields.forEach((field: Field) => {
    if (field.name === 'labels') {
      labelVals = field.values[rowIndex];
      return;
    }
    keyVals[field.name] = field.values[rowIndex];
  });

  return (
    <tr>
      <td colSpan={'100%'}>
        <div className={`p-8 bg-neutral-50 border-1 border-neutral-200 rounded-lg m-8 shadow-lg`}>
          <table>
            {Object.entries(keyVals).map(([k, v]) => {
              return (
                <tr key={k} className={`font-mono hover:bg-neutral-200`}>
                  <td className={`font-semibold`}>{k}:</td>
                  <td>{v}</td>
                </tr>
              );
            })}
            {Object.entries(labelVals).map(([k, v]) => {
              return (
                <tr key={k} className={`font-mono hover:bg-neutral-200`}>
                  <td className={`font-semibold`}>{k}:</td>
                  <td>{v}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </td>
    </tr>
  );
};
