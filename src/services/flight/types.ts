import type { Collection } from '@/types/api/Collection';
import type { PaginatedQuery } from '@/types/api/PaginatedQuery';

export interface Flight {
  flightId: number;
  createdAt: string;
  updatedAt: string;
  registration: string;
  flight: string | null;
  callsign: string;
  origin: string | null;
  destination: string | null;
  divertedTo: string | null;
  model: string;
  icaoAddress: string;
}

export type FlightCollection = Collection<Flight>;

export interface GetFlightCollectionParams extends PaginatedQuery {}
