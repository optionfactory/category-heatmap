import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import { FormField, Switch } from '@grafana/ui';

import { HeatmapOptions } from './types';

export class HeatmapEditor extends PureComponent<PanelEditorProps<HeatmapOptions>> {
  onXAxisChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, xAxisField: target.value });
  };
  onXSorterChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, xSorterType: target.value });
  };
  onYAxisChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, yAxisField: target.value });
  };
  onYSorterChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, ySorterType: target.value });
  };
  onValuesChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, valuesField: target.value });
  };
  onPercentageChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, showInPercentage: target.checked });
  };

  onNullValuesAsZero = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, nullValuesAsZero: target.checked });
  };
  onZeroValuesAsNull = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, zeroValuesAsNull: target.checked });
  };
  onColorscaleChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, colorscale: target.value });
  };

  render() {
    const { options } = this.props;

    let fieldOptions = [<option>Select field</option>];
    if (this.props.data.state === 'Done') {
      fieldOptions = fieldOptions.concat(
        this.props.data.series[0].fields.map(field => field.name).map(fieldName => <option value={fieldName}>{fieldName}</option>)
      );
    }

    const xCombo = (
      <select onChange={this.onXAxisChanged} value={options.xAxisField || ''}>
        {fieldOptions}
      </select>
    );
    const xSorterCombo = (
      <select onChange={this.onXSorterChanged} value={options.xSorterType || 'text'}>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="version">Version</option>
      </select>
    );

    const yCombo = (
      <select onChange={this.onYAxisChanged} value={options.yAxisField || ''}>
        {fieldOptions}
      </select>
    );
    const ySorterCombo = (
      <select onChange={this.onYSorterChanged} value={options.ySorterType || 'text'}>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="version">Version</option>
      </select>
    );
    const valuesCombo = (
      <select onChange={this.onValuesChanged} value={options.valuesField || ''}>
        {fieldOptions}
      </select>
    );

    const defaultColorscaleCombo = (
      <select onChange={this.onColorscaleChange} value={typeof options.colorscale === 'string' ? options.colorscale : 'Portland'}>
        <option value="Portland">Portland</option>
        <option value="YIOrRd">YIOrRd</option>
        <option value="YIGnBu">YIGnBu</option>
        <option value="RdBu">RdBu</option>
        <option value="Picnic">Picnic</option>
        <option value="Jet">Jet</option>
        <option value="Hot">Hot</option>
        <option value="Greys">Greys</option>
        <option value="Greens">Greens</option>
        <option value="Electric">Electric</option>
        <option value="Earth">Earth</option>
        <option value="Bluered">Bluered</option>
        <option value="Blackbody">Blackbody</option>
      </select>
    );
    return (
      <div className="section gf-form-group">
        <div style={{ display: 'flex' }}>
          <FormField label="X axis field" inputEl={xCombo} style={{ marginRight: '15px' }}></FormField>
          <FormField label="Sorter type" inputEl={xSorterCombo}></FormField>
        </div>
        <div style={{ display: 'flex' }}>
          <FormField label="Y axis field" inputEl={yCombo} style={{ marginRight: '15px' }}></FormField>
          <FormField label="Sorter type" inputEl={ySorterCombo}></FormField>
        </div>
        <FormField label="Values field" inputEl={valuesCombo}></FormField>
        <Switch label="Show in percentage (of column)" onChange={this.onPercentageChange} checked={options.showInPercentage || false}></Switch>
        <FormField label="Color scale" inputEl={defaultColorscaleCombo}></FormField>
        <Switch label="Null Values as Zero" onChange={this.onNullValuesAsZero} checked={options.nullValuesAsZero || false}></Switch>
        <Switch label="Zero Values as Null" onChange={this.onZeroValuesAsNull} checked={options.zeroValuesAsNull || false}></Switch>
      </div>
    );
  }
}
