import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import CSS from 'csstype';

import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onSorterChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, sorterType: target.value });
  };

  render() {
    const { options } = this.props;

    const labelStyle: CSS.Properties = {
      marginRight: '15px'
    }

    return (
      <div className="section gf-form-group">
        <label htmlFor="sorterType" style={labelStyle}>Sorter Type</label>
        <select name="sorterType" id="sorterType" onChange={this.onSorterChanged} value={options.sorterType || 'text'}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="version">Version</option>
        </select>
      </div>
    );
  }
}
