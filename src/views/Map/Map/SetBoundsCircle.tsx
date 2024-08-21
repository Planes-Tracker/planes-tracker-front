import { useMap, Circle } from 'react-leaflet';

import type { MapSettings } from '@/services/map/types';

interface SetBoundsCircleProps {
  settings: MapSettings;
}

function SetBoundsCircle({ settings }: SetBoundsCircleProps) {
  const map = useMap();

  if (settings.bounds) map.fitBounds(settings.bounds);

  return settings.bounds ? (
    <Circle
      fill={false}
      interactive={false}
      center={[settings.latitude, settings.longitude]}
      radius={settings.radius}
    />
  ) : null;
}

export default SetBoundsCircle;
