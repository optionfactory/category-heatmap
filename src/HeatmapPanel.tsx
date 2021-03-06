import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { HeatmapOptions } from 'types';
import Plot from 'react-plotly.js';

interface Props extends PanelProps<HeatmapOptions> {}

export class HeatmapPanel extends PureComponent<Props> {
  render() {
    const { data, width, height, options } = this.props;
    if (data.state !== 'Done') {
      console.log(`data.state is not Done (${data.state})`);
      return;
    }
    const rawData = data.series[0].fields;
    const columns = rawData
      .filter(field => field.name === options.xAxisField)[0]
      .values.toArray()
      .map(column => `\u200B${column}`);
    const rows = rawData
      .filter(field => field.name === options.yAxisField)[0]
      .values.toArray()
      .map(row => `\u200B${row}`);
    const values = rawData
      .filter(field => field.name === options.valuesField)[0]
      .values.toArray()
      .map((v, index) => {
        return {
          value: v,
          row: rows[index],
          column: columns[index],
        };
      })
      .reduce((acc, current) => {
        if (!acc[current.column]) {
          acc[current.column] = {};
        }
        if (!acc[current.column][current.row]) {
          acc[current.column][current.row] = 0;
        }
        acc[current.column][current.row] = acc[current.column][current.row] + current.value;
        return acc;
      }, {} as any);
    const percentages: any = {};
    for (const columnId in values) {
      const column = values[columnId];
      percentages[columnId] = {};
      const percentageColumn = percentages[columnId];
      let total = 0;
      for (const rowId in column) {
        total += column[rowId];
      }
      total = Math.max(total, 1);
      for (const rowId in column) {
        percentageColumn[rowId] = (column[rowId] / total) * 100;
      }
    }
    if (options.showInPercentage) {
    }

    const xSorter = this.getSorterFunction(options.xSorterType);
    const ySorter = this.getSorterFunction(options.ySorterType);

    const sortedColumns = Array.from(new Set(columns)).sort(xSorter);
    const sortedRows = Array.from(new Set(rows))
      .sort(ySorter)
      .reverse();

    const plotData = this.mapValues(sortedRows, sortedColumns, values, options.nullValuesAsZero, options.zeroValuesAsNull);
    const percentageData = this.mapValues(sortedRows, sortedColumns, percentages, options.nullValuesAsZero, options.zeroValuesAsNull);

    const a = (
      <Plot
        data={[
          {
            type: 'heatmap',
            z: options.showInPercentage ? percentageData : plotData,
            x: sortedColumns,
            y: sortedRows,
            colorscale: options.colorscale,
            customdata: options.showInPercentage ? plotData : percentageData,
            hoverinfo: 'none',
            hovertemplate:
              `${options.xAxisField} : %{x}<br>` +
              `${options.yAxisField} : %{y}<br>` +
              `${options.showInPercentage ? 'percentage' : options.valuesField} : %{z}${options.showInPercentage ? '%' : ''}<br>` +
              `${options.showInPercentage ? options.valuesField : 'percentage'} : %{customdata}${options.showInPercentage ? '' : '%'}<extra></extra>`,
          },
        ]}
        layout={{
          width,
          height,
          margin: {
            l: 160,
          },
          xaxis: {
            color: '#d8d9da',
            showgrid: false,
          },
          yaxis: {
            color: '#d8d9da',
            showgrid: false,
            tickangle: 45,
          },
          plot_bgcolor: '#00000000',
          paper_bgcolor: '#00000000',
        }}
      />
    );
    return a;
  }

  private stringSorter(a: string, b: string): number {
    return a.replace('\u200B', '').localeCompare(b.replace('\u200B', ''));
  }

  private numericSorter(a: string, b: string): number {
    return +a.replace('\u200B', '') - +b.replace('\u200B', '');
  }

  private versionSorter(a: string, b: string): number {
    if (a.indexOf('.') === -1) {
      return -1;
    }
    const [aMajor, aMinor, aPatch = 0] = a.split('.').map(n => +n.replace('\u200B', ''));
    const [bMajor, bMinor, bPatch = 0] = b.split('.').map(n => +n.replace('\u200B', ''));
    const aWeight = aMajor * 100_000 + aMinor * 1000 + aPatch;
    const bWeight = bMajor * 100_000 + bMinor * 1000 + bPatch;
    return aWeight - bWeight;
  }

  private getSorterFunction(sorterName: string) {
    let sorterFn;
    switch (sorterName) {
      case 'text':
        sorterFn = this.stringSorter;
        break;
      case 'number':
        sorterFn = this.numericSorter;
        break;
      case 'version':
        sorterFn = this.versionSorter;
        break;
      default:
        sorterFn = this.stringSorter;
    }
    return sorterFn;
  }

  private mapValues(sortedRows: string[], sortedColumns: string[], dataToMap: any, nullValuesAsZero: boolean, zeroValuesAsNull: boolean): any[] {
    const data: any[] = [];
    sortedRows.forEach(s => {
      const acc: any[] = [];
      sortedColumns.forEach(v => {
        let value = dataToMap[v][s];
        if (value === undefined) {
          value = null;
        }
        if (nullValuesAsZero && value === null) {
          value = 0;
        }
        if (zeroValuesAsNull && value === 0) {
          value = null;
        }
        acc.push(value);
      });
      data.push(acc);
    });
    return data;
  }
}
