export interface Cargo {
  id?: number;
  name: string;
  from: string;
  to: string;
  weight: string;
  volume: string;
  transportType: string;
  shipmentDate: Date;
  price: number;
  authorId: number;
  contacts: string[];
}

export type EditCargo = Omit<Cargo, "contacts" | "authorId"> & {
  contacts: {
    id: number;
    contact: string;
  }[];
};
