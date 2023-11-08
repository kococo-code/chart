export interface Margin {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
export const DEFAULT_CHART_MARGIN: Margin = {
  top: 20,
  bottom: 40,
  right: 40,
  left: 30,
};

export interface DomRange {
  max: number;
  min: number;
}
export type DefaultInputType = number | string | Date;
export type ContinousDomain = number | Date;
export interface TimeSeriesDomain {
  x: string[];
  y: DefaultInputType[];
}
