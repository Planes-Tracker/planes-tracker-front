import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

const useMapLayer = (name: string, enabled = false) => {
  const [isLayerEnabled, setIsLayerEnabled] = useState(enabled);

  useMapEvents({
    overlayadd(event) {
      if (event.name === name) setIsLayerEnabled(true);
    },
    overlayremove(event) {
      if (event.name === name) setIsLayerEnabled(false);
    },
  });

  return {
    name,
    isEnabled: isLayerEnabled,
  };
};

export default useMapLayer;
