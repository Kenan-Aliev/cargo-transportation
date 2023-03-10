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

export interface CargoFilter {
  where: {
    to?: {
      contains?: string;
    };
    shipmentDate?: {
      lte?: Date;
      gte?: Date;
    };
  };
}
