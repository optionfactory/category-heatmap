import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import { FormField, Switch } from '@grafana/ui';

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
  onPercentageChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, showInPercentage: target.checked });
  };

  render() {
    const { options } = this.props;
    
    let fieldOptions = [<option>Select field</option>];
    if (this.props.data.state === 'Done') {
      fieldOptions = fieldOptions.concat(this.props.data.series[0].fields
        .map(field => field.name)
        .map(fieldName => <option value={fieldName}>{fieldName}</option>));
    }

    const xCombo = <select onChange={this.onXAxisChanged} value={options.xAxisField || ''}>
      {fieldOptions}
    </select>
    const xSorterCombo = <select onChange={this.onXSorterChanged} value={options.xSorterType || 'text'}>
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="version">Version</option>
    </select>
    const yCombo = <select onChange={this.onYAxisChanged} value={options.yAxisField || ''}>
      {fieldOptions}
    </select>
    const ySorterCombo = <select onChange={this.onYSorterChanged} value={options.ySorterType || 'text'}>
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="version">Version</option>
    </select>
    const valuesCombo = <select onChange={this.onValuesChanged} value={options.valuesField || ''}>
      {fieldOptions}
    </select>

    return (
      <div className="section gf-form-group">
        <div style={{display: 'flex'}}>
          <FormField label="X axis field" inputEl={xCombo}
            style={{marginRight: '15px'}}></FormField>
          <FormField label="Sorter type" inputEl={xSorterCombo}></FormField>
        </div>
        <div style={{display: 'flex'}}>
          <FormField label="Y axis field" inputEl={yCombo}
            style={{marginRight: '15px'}}></FormField>
          <FormField label="Sorter type" inputEl={ySorterCombo}></FormField>
        </div>
        <FormField label="Values field" inputEl={valuesCombo}></FormField>
        <Switch label="Show in percentage" onChange={this.onPercentageChange} checked={options.showInPercentage || false}></Switch>
      </div>
    );
  }
}
