export interface HeatmapOptions {
  xAxisField: string;
  xSorterType: 'text' | 'number' | 'version';
  yAxisField: string;
  ySorterType: 'text' | 'number' | 'version';
  valuesField: string;
  showInPercentage: boolean;
}

export const defaults: HeatmapOptions = {
  xAxisField: 'version',
  xSorterType: 'text',
  yAxisField: 'status',
  ySorterType: 'text',
  valuesField: 'Value',
  showInPercentage: false,
};
