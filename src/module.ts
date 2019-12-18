import { PanelPlugin } from '@grafana/data';
import { HeatmapOptions, defaults } from './types';
import { HeatmapPanel } from './HeatmapPanel';
import { HeatmapEditor } from './HeatmapEditor';

export const plugin = new PanelPlugin<HeatmapOptions>(HeatmapPanel).setDefaults(defaults).setEditor(HeatmapEditor);
