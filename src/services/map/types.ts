import type { Collection, CollectionObject } from '@/types/api/Collection';

export interface MapSettings {
  latitude: number;
  longitude: number;
  radius: number;
  bounds: [[number, number], [number, number]] | null;
}

export type HeatmapFlightPoint = [number, number];

export type HeatmapPointsCollection = Collection<HeatmapFlightPoint>;

export type TrailsFlightPoint = [number, number, number];

export type TrailsFlightPoints = Record<string, TrailsFlightPoint[]>;

export type TrailsFlightPointsCollection = CollectionObject<TrailsFlightPoints>;
