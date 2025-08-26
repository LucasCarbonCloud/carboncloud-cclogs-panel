type SeriesSize = 'sm' | 'md' | 'lg';
export type FilterOperation = '=' | '!='

export interface SimpleOptions {
  traceUrl: string;
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}

export interface Filter {
  key: string;
  operation: FilterOperation;
  value: any;
}
