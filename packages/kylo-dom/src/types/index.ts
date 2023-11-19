export interface Margin {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

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
