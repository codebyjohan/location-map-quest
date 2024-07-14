export type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type SearchResponse = {
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      display_name: string;
      place_id: number;
    };
  }[];
};
