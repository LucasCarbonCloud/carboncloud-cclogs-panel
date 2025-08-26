import React, { useMemo } from 'react';
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

export const TableData: React.FC<TableDataProps> = React.memo(function TableData({ options, columnName, value, displayLevel, setSelectedFilters }) {
  const theme = useTheme2();
  
  const processedData = useMemo(() => {
    let displayValue = value;
    let pClass = 'flex relative min-w-0 w-full';
    let isSpecialRendering = false;
    let specialContent = null;

    const dateFormat = 'MMM DD HH:mm:ss.SSS';

    if (columnName === 'timestamp') {
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
    } else if (columnName === 'body') {
      const searchTerm = getTemplateSrv().replace('$searchTerm');
      if (searchTerm !== '' && searchTerm.length > 1) {
        const sst = value.split(searchTerm);
        if (sst.length > 1) {
          isSpecialRendering = true;
          specialContent = (
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
          );
        }
      }
    } else if (columnName.startsWith('labels.')) {
      displayValue = value[columnName.replace(/^labels\./, '')];
      if (displayValue === undefined) {
        displayValue = '';
      }
    }

    return { displayValue, pClass, isSpecialRendering, specialContent };
  }, [columnName, value, displayLevel, theme]);

  const { displayValue, pClass, isSpecialRendering, specialContent } = processedData;

  if (isSpecialRendering && specialContent) {
    return (
      <div className="w-full min-w-0 overflow-hidden">
        {specialContent}
      </div>
    );
  }

  if (columnName === 'traceID') {
    return (
      <div className={pClass}>
        <a 
          href={options.traceUrl.replace('{{ traceID }}', displayValue)} 
          target="_blank" 
          rel="noreferrer"
          className="hover:underline truncate min-w-0 flex-1"
        >
          <span className="truncate">{displayValue}</span>
        </a>
        <div
          className={clsx(
            'group-hover:flex hidden gap-1 ml-2 flex-shrink-0',
            theme.isDark ? 'text-neutral-400' : 'text-neutral-400'
          )}
        >
          <FontAwesomeIcon
            className="cursor-pointer hover:text-neutral-600"
            icon={faMagnifyingGlassPlus}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFilters(columnName, "=", displayValue, "add");
            }}
          />
          <FontAwesomeIcon
            className="cursor-pointer hover:text-neutral-600"
            icon={faMagnifyingGlassMinus}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFilters(columnName, "!=", displayValue, "add");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={pClass}>
      <span className={clsx(
        'truncate min-w-0 flex-1',
        columnName === 'body' ? 'font-mono text-xs' : ''
      )}>
        {displayValue}
      </span>
      <div
        className={clsx(
          'group-hover:flex hidden gap-1 ml-2 flex-shrink-0',
          theme.isDark ? 'text-neutral-400' : 'text-neutral-400'
        )}
      >
        <FontAwesomeIcon
          className="cursor-pointer hover:text-neutral-600"
          icon={faMagnifyingGlassPlus}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFilters(columnName, "=", displayValue, "add");
          }}
        />
        <FontAwesomeIcon
          className="cursor-pointer hover:text-neutral-600"
          icon={faMagnifyingGlassMinus}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFilters(columnName, "!=", displayValue, "add");
          }}
        />
      </div>
    </div>
  );
});

TableData.displayName = 'TableData';
