import type { MapSettings } from '@/services/map/types';

const useMapSettings = (settings?: MapSettings) =>
  settings ?? {
    latitude: 0,
    longitude: 0,
    radius: 15000000,
    bounds: null,
  };

export default useMapSettings;
