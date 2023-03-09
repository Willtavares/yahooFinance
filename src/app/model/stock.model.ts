export interface Stock {
  timestamp?: Timestamp[];
  indicators?: Indicators;
}

export interface Timestamp {
  timestamp?: Array<Number>;
}

export interface Indicators {
  quote: [
    {
      high: Array<Number>;
      low: Array<Number>;
      volume: Array<Number>;
      close: Array<Number>;
      open: Array<Number>;
    }
  ];
}
