export interface Car {
  id?: number;
  name: string;
  from: string;
  to: string;
  weight: string;
  volume: string;
  transportType: string;
  shipmentDate: Date;
  authorId: number;
  contacts: string[];
}

export type EditCar = Omit<Car, "contacts" | "authorId"> & {
  contacts: {
    id: number;
    contact: string;
  }[];
};
