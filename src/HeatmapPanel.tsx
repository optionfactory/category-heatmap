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
    const versions = rawData
      .filter(field => field.name === options.xAxisField)[0]
      .values.toArray()
      .map(version => `\u200B${version}`);
    const statuses = rawData
      .filter(field => field.name === options.yAxisField)[0]
      .values.toArray()
      .map(status => `\u200B${status}`);
    const values = rawData
      .filter(field => field.name === options.valuesField)[0]
      .values.toArray()
      .map((v, index) => {
        return {
          value: v,
          status: statuses[index],
          version: versions[index],
        };
      })
      .reduce((acc, current) => {
        if (!acc[current.version]) {
          acc[current.version] = {};
        }
        if (!acc[current.version][current.status]) {
          acc[current.version][current.status] = 0;
        }
        acc[current.version][current.status] = acc[current.version][current.status] + current.value;
        return acc;
      }, {} as any);
    if (options.showInPercentage) {
      for (const version in values) {
        const row = values[version];
        let total = 0;
        for (const status in row) {
          total += row[status];
        }
        total = Math.max(total, 1);
        for (const status in row) {
          row[status] = row[status] / total;
        }
      }
    }

    const xSorter = this.getSorterFunction(options.xSorterType);
    const ySorter = this.getSorterFunction(options.ySorterType);

    const sortedVersions = Array.from(new Set(versions)).sort(xSorter);
    const sortedStatuses = Array.from(new Set(statuses))
      .sort(ySorter)
      .reverse();

    const plotData: any[] = [];
    sortedStatuses.map(s => {
      const acc: any[] = [];
      sortedVersions.forEach(v => {
        acc.push(values[v][s]);
      });
      plotData.push(acc);
    });

    const a = (
      <Plot
        data={[
          {
            type: 'heatmap',
            z: plotData,
            x: sortedVersions,
            y: sortedStatuses,
          },
        ]}
        layout={{
          width,
          height,
          margin: {
            l: 160,
          },
          yaxis: {
            tickangle: 45,
          },
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
}
