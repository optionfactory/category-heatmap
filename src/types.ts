export interface SimpleOptions {
  xAxisField: string;
  xSorterType: 'text' | 'number' | 'version';
  yAxisField: string;
  ySorterType: 'text' | 'number' | 'version';
  valuesField: string;
}

export const defaults: SimpleOptions = {
  xAxisField: 'version',
  xSorterType: 'text',
  yAxisField: 'status',
  ySorterType: 'text',
  valuesField: 'Value'
};
