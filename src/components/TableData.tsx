import React from 'react';
import dayjs from 'dayjs';
import { SimpleOptions, FilterOperation } from 'types';

import { getTemplateSrv } from '@grafana/runtime';
import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';

export interface TableDataProps {
  options: SimpleOptions;
  columnName: string;
  value: any;
  displayLevel: boolean;
  setSelectedFilters: (
    key: string,
    operation: FilterOperation,
    value: any,
    op: "add" | "rm"
  ) => void;
}

export const TableData: React.FC<TableDataProps> = ({ options, columnName, value, displayLevel, setSelectedFilters }) => {
  const theme = useTheme2();
  let displayValue = value;
  let pClass = 'px-4 flex relative';

  // const dateFormat = 'YYYY-MM-DD HH:mm:ss.SSS';
  const dateFormat = 'MMM DD HH:mm:ss.SSS';

  if (columnName === 'timestamp') {
    // displayValue = formatTimestamp(value);
    displayValue = dayjs(value).format(dateFormat);
  } else if (columnName === 'level') {
    let color;
    switch (value) {
      case 'DEBUG':
        color = 'bg-blue-500';
        break;
      case 'INFO':
        color = 'bg-green-500';
        break;
      case 'WARN':
        color = 'bg-yellow-500';
        break;
      case 'ERROR':
        color = 'bg-red-500';
        break;
      case 'FATAL':
        color = 'bg-purple-500';
        break;
      default:
        color = 'bg-gray-500';
    }
    pClass = `mr-1 ml-1 min-h-[1.5rem] ${color} `;
    if (!displayLevel) {
      pClass += 'w-1.5 rounded-full';
      displayValue = ``;
    } else {
      pClass += 'rounded-lg px-1';
    }
    // flex = 'flex';
    // displayValue = ``;
  } else if (columnName === 'body') {
    const searchTerm = getTemplateSrv().replace('$searchTerm');
    if (searchTerm !== '') {
      const sst = value.split(searchTerm);
      if (searchTerm.length > 1) {
        return (
          <td
            className={`font-mono h-full text-nowrap `}
            style={{ paddingBottom: '4px', paddingTop: '4px', margin: '0px' }}
          >
            {/*return a div with string h in it if columnName == timestamp*/}
            <div className={pClass + ` flex content-center`}>
              {sst.map((s: string, idx: number) => {
                if (idx === sst.length - 1) {
                  return (
                    <p key={idx} style={{ margin: '0px' }}>
                      {s}
                    </p>
                  );
                }
                return (
                  <React.Fragment key={idx}>
                    <p style={{ margin: '0px' }}>{s}</p>
                    <p
                      style={{ margin: '0px' }}
                      className={clsx(
                        'px-1 m-0 bg-fuchsia-200 rounded-lg shadow',
                        theme.isDark ? 'bg-fuchsia-900' : 'bg-fuchsia-200'
                      )}
                    >
                      {searchTerm}
                    </p>
                  </React.Fragment>
                );
              })}
            </div>
          </td>
        );
      }
    }
  } else if (columnName.startsWith('labels.')) {
    displayValue = value[columnName.replace(/^labels\./, '')];
    if (displayValue === undefined) {
      displayValue = '';
    }
  }

  if (columnName === 'traceID') {
    return (
      <td
        className={`font-mono h-full text-nowrap hover:underline dark:text-2xl group`}
        style={{ paddingBottom: '4px', paddingTop: '4px' }}
      >
        <div className={pClass}>
          <a href={options.traceUrl.replace('{{ traceID }}', displayValue)} target="_blank" rel="noreferrer">
        <span>{displayValue}</span>
        <div
          className={clsx(
            'group-hover:flex hidden gap-1 absolute right-0 top-0 bg-gradient-to-l from-neutral-100 to-neutral-200/0 pl-20 pr-1 justify-end',
            theme.isDark ? 'from-neutral-800' : 'from-neutral-100 text-neutral-400'
          )}
        >
          <FontAwesomeIcon
            className="cursor-pointer hover:text-neutral-600"
            icon={faMagnifyingGlassPlus}
            onClick={() => setSelectedFilters(columnName, "=", displayValue, "add")}
          />
          <FontAwesomeIcon
            className="cursor-pointer hover:text-neutral-600"
            icon={faMagnifyingGlassMinus}
            onClick={() => setSelectedFilters(columnName, "!=", displayValue, "add")}
          />
        </div>
          </a>
        </div>
      </td>
    );
  }

  return (
    <td className={`font-mono h-full text-nowrap group`} style={{ paddingBottom: '4px', paddingTop: '4px' }}>
      <div className={pClass}>
        <span>{displayValue}</span>
        <div
          className={clsx(
            'group-hover:flex hidden gap-1 absolute right-0 top-0 bg-gradient-to-l from-neutral-100 to-neutral-200/0 pl-20 pr-1 justify-end',
            theme.isDark ? 'from-neutral-800' : 'from-neutral-100 text-neutral-400'
          )}
        >
          <FontAwesomeIcon
            className="cursor-pointer hover:text-neutral-600"
            icon={faMagnifyingGlassPlus}
            onClick={() => setSelectedFilters(columnName, "=", displayValue, "add")}
          />
          <FontAwesomeIcon
            className="cursor-pointer hover:text-neutral-600"
            icon={faMagnifyingGlassMinus}
            onClick={() => setSelectedFilters(columnName, "!=", displayValue, "add")}
          />
        </div>
      </div>
    </td>
  );
};
