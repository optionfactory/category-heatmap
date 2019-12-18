import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import { FormField } from '@grafana/ui';

import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
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

  render() {
    const { options } = this.props;

    const xCombo = <select name="sorterType" id="sorterType" onChange={this.onXSorterChanged} value={options.xSorterType || 'text'}>
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="version">Version</option>
    </select>
    const yCombo = <select name="sorterType" id="sorterType" onChange={this.onYSorterChanged} value={options.ySorterType || 'text'}>
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="version">Version</option>
    </select>

    return (
      <div className="section gf-form-group">
        <div style={{display: 'flex'}}>
          <FormField label="X axis field" onChange={this.onXAxisChanged} value={options.xAxisField || ''}
            style={{marginRight: '15px'}}></FormField>
          <FormField label="Sorter type" inputEl={xCombo}></FormField>
        </div>
        <div style={{display: 'flex'}}>
          <FormField label="Y axis field" onChange={this.onYAxisChanged} value={options.yAxisField || ''}
            style={{marginRight: '15px'}}></FormField>
          <FormField label="Sorter type" inputEl={yCombo}></FormField>
        </div>
        <FormField label="Values field" onChange={this.onValuesChanged} value={options.valuesField || ''}></FormField>
      </div>
    );
  }
}
