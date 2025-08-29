import { Field } from '@grafana/data';
import React, { useState, useEffect } from 'react';

import { useTheme2 } from '@grafana/ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { stringToDarkColor, timeAgo } from './functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCopy, faCode, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGolang, faPython, faHackerrank} from '@fortawesome/free-brands-svg-icons';
import { SimpleOptions } from 'types';

export interface LogDetailsProps {
  options: SimpleOptions;
  fields: Field[];
  rowIndex: number;
  setLogDetails: (idx: number | undefined) => void;
}

export const LogDetails: React.FC<LogDetailsProps> = ({ options, fields, rowIndex, setLogDetails }) => {
  const theme = useTheme2();

  let keyVals: { [key: string]: string } = {};
  let labelVals: { [key: string]: string } = {};

  fields.forEach((field: Field) => {
    if (field.name === 'labels') {
      labelVals = field.values[rowIndex] as { [key: string]: string };
      return;
    }
    keyVals[field.name] = field.values[rowIndex];
  });

  const timestamp = keyVals["timestamp"];
  const [displayTimeAgo, setDisplayTimeAgo] = useState(timeAgo(timestamp));
  const [copied, setCopied] = useState(false);

  const languageIcons = {
    python: faPython,
    go: faGolang,
    haskell: faHackerrank,
    other: faCode
  } as const;

  const languageColor= {
    python: "#FFD43B",
    go: "#00ADD8",
    haskell: "#453A62",
    other: "#964B00"
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset message after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTimeAgo(timeAgo(timestamp));
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

    let levelColor;
    switch (keyVals["level"]) {
      case 'DEBUG':
        levelColor = 'blue-500';
        break;
      case 'INFO':
        levelColor = 'green-500';
        break;
      case 'WARN':
        levelColor = 'yellow-500';
        break;
      case 'ERROR':
        levelColor = 'red-500';
        break;
      case 'FATAL':
        levelColor = 'purple-500';
        break;
      default:
        levelColor = 'gray-500';
    }


  return (
   <div
     className={clsx(
       `px-4 border-1  shadow-2xl absolute right-0 top-0 w-1/2 h-full border-t-5 border-t-${levelColor} overflow-y-scroll pb-4`,
       theme.isDark ? 'bg-[#111217] border-neutral-200/20' : 'bg-neutral-50 border-neutral-200'
     )}
   >
    <div
    className={clsx(
      `flex py-4 border-b-2 items-center justify-between sticky top-0 z-50`,
       theme.isDark ? 'bg-[#111217] border-neutral-700' : 'bg-neutral-50 border-neutral-200'
    )}
    >
      <div
      className={clsx(
        `flex items-center`
      )}
      >
        <div className={`bg-${levelColor} rounded-md px-2 py-1 text-white text-xs font-bold text-center`}>
          {keyVals["level"]}
        </div>
        <span className={
          `font-bold text-sm ml-2`
        }>
          {dayjs(keyVals["timestamp"]).format('MMM DD, YYYY [at] HH:mm:ss.SSS')}
        </span>
        <span className={
          `text-sm ml-2 text-neutral-400`
        }>
          ({displayTimeAgo})
        </span>
      </div>

      <FontAwesomeIcon
        className="text-xl cursor-pointer hover:text-neutral-300"
        icon={faXmark}
        onClick={() => setLogDetails(undefined)}
      />
    </div>


    <div className={`flex px-2 py-4 items-center gap-2`}>
    { typeof labelVals["language"] === "string" && languageIcons[labelVals["language"] as keyof typeof languageIcons] &&
      <FontAwesomeIcon
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        icon={languageIcons[labelVals["language"] as keyof typeof languageIcons] as any}
        className={clsx(
          `text-2xl  text-[${languageColor[labelVals["language"] as keyof typeof languageColor]}]`
        )}
       />
    }
    <span className={clsx(
      `uppercase font-bold text`,
       theme.isDark ? 'text-neutral-400' : 'text-neutral-500'
    )}>
    {labelVals["app"]} - {labelVals["component"]}
      </span>
      <div className={clsx(
        `bg-[${stringToDarkColor(labelVals["team"])}] text-white text-xs px-2 rounded-md font-bold uppercase`
      )}>
    {labelVals["team"]}
      </div>
    </div>

    <div className="flex gap-2 px-2">
      {keyVals["traceID"] &&
       <div className={`text-white text-sm font-bold my-2`}>
       <span className={
        `bg-violet-800 uppercase px-2 py-1`
       }>
         Trace-ID
       </span>
       <span className={
        `bg-violet-400 px-2 py-1`
       }>
         {keyVals["traceID"]}

      <FontAwesomeIcon
        className="pl-2 text-xs cursor-pointer hover:text-neutral-300"
        icon={faArrowUpRightFromSquare}
        onClick={() => {
          if (typeof keyVals.traceID === "string") {
            const url = options.traceUrl.replace("{{ traceID }}", keyVals.traceID);
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }}
      />
       </span>
      </div>
      }
      {keyVals["spanID"] &&
       <div className={`text-white text-sm font-bold my-2`}>
       <span className={
        `bg-cyan-800 uppercase px-2 py-1`
       }>
         Span-ID
       </span>
       <span className={
        `bg-cyan-400 px-2 py-1`
       }>
         {keyVals["spanID"]}
       </span>
      </div>
      }
    </div>

    <div className="relative">
      <span
      className={clsx(
        `flex p-4 font-mono border-1 my-4 mx-2 pr-8`,
         theme.isDark ? 'bg-neutral-100/10 border-neutral-500' : 'bg-neutral-100 border-neutral-300'
      )}
      >
        {keyVals["body"]}
      </span>
      <div
        onClick={() => handleCopy(keyVals["body"])}
        className={clsx(
        `flex absolute top-2 right-2 gap-2 items-center py-1 px-3 rounded-lg cursor-pointer group  hover:border-neutral-300 hover:border-1`,
         theme.isDark ? 'hover:bg-neutral-800/80' : 'hover:bg-neutral-200/80'
        )}
      >
        <FontAwesomeIcon
          className="text-xl cursor-pointer text-neutral-400"
          icon={faCopy}
        />
       <span className="hidden text-xs group-hover:block">
          {copied ? "Copied!" : "Copy"}
        </span>
      </div>
    </div>

      <div className="flex flex-col px-2 pt-4">
      <span className="mb-2 text-lg font-bold uppercase text-neutral-400">Labels</span>
    <table className="w-full">
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
                  <td className={`break-all`}>{v}</td>
                </tr>
              );
            })}
          </table>
        </div>
        </div>

  );
};
