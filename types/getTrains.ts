export type Metro = {
  GroupOfLine: string;
  DisplayTime: string;
  TransportMode: string;
  LineNumber: string;
  Destination: string;
  JourneyDirection: number;
  StopAreaName: string;
  StopAreaNumber: number;
  StopPointNumber: number;
  StopPointDesignation: string;
  TimeTabledDateTime: string;
  ExpectedDateTime: string;
  JourneyNumber: number;
  Deviations: null;
};

export type SLResponse = {
  LatestUpdate: string;
  DataAge: 14;
  Metros: Metro[];
  Buses: [];
  Trains: [];
  Trams: [];
  Ships: [];
  StopPointDeviations: [];
};
