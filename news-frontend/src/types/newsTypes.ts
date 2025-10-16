export type MeasurementType = "TEMP" | "HR" | "RR";

export type FormValues = {
  temp: number;
  hr: number;
  rr: number;
};

export interface Measurement {
  type: MeasurementType;
  value: number;
}

export interface NewsRequest {
  measurements: Measurement[];
}

export interface NewsResponse {
  score: number | null;
  errors: Record<string, string>;
}
