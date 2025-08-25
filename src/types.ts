type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  traceUrl: string;
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
