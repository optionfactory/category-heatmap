import { ColorScale } from 'plotly.js';

export interface HeatmapOptions {
  xAxisField: string;
  xSorterType: 'text' | 'number' | 'version';
  yAxisField: string;
  ySorterType: 'text' | 'number' | 'version';
  valuesField: string;
  showInPercentage: boolean;
  colorscale: ColorScale;
  nullValuesAsZero: boolean;
  zeroValuesAsNull: boolean;
}

export const defaults: HeatmapOptions = {
  xAxisField: 'version',
  xSorterType: 'text',
  yAxisField: 'status',
  ySorterType: 'text',
  valuesField: 'Value',
  showInPercentage: false,
  colorscale: 'Portland',
  nullValuesAsZero: false,
  zeroValuesAsNull: false,
};
