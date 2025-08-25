import { Field } from '@grafana/data';
import React from 'react';

import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';

export interface LogDetailsProps {
  fields: Field[];
  rowIndex: number;
}

export const LogDetails: React.FC<LogDetailsProps> = ({ fields, rowIndex }) => {
  const theme = useTheme2();

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
      <td colSpan={100}>
        <div
          className={clsx(
            'p-8 border-1 rounded-lg m-8 shadow-lg',
            theme.isDark ? 'bg-[#111217] border-neutral-200/20' : 'bg-neutral-50 border-neutral-200'
          )}
        >
          <table>
            {Object.entries(keyVals).map(([k, v]) => {
              return (
                <tr
                  key={k}
                  className={clsx(
                    'font-mono',
                    theme.isDark ? 'hover:bg-neutral-200/20' : 'hover:bg-neutral-200'
                  )}
                >
                  <td className={`font-semibold`}>{k}:</td>
                  <td>{v}</td>
                </tr>
              );
            })}
            {Object.entries(labelVals).map(([k, v]) => {
              return (
                <tr
                  key={k}
                  className={clsx(
                    'font-mono',
                    theme.isDark ? 'hover:bg-neutral-200/20' : 'hover:bg-neutral-200'
                  )}
                >
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
