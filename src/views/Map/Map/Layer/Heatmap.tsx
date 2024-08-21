import type { HeatLatLngTuple } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { LayersControl } from 'react-leaflet';
import ReactLeafletHeatmapLayer from 'react-leaflet-heat-layer';

import { useGetHeatmapPointsQuery } from '@/services/map/api';
import useMapLayer from '@/views/Map/Map/hooks/useMapLayer';

const LAYER_NAME = 'heatmap';

function HeatmapLayer() {
  const { name, isEnabled } = useMapLayer(LAYER_NAME);
  const { t } = useTranslation();

  // ToDo: add backdrop while loading
  const { data: flightPoints } = useGetHeatmapPointsQuery(undefined, {
    skip: !isEnabled,
  });

  return (
    <LayersControl.Overlay checked={isEnabled} name={t(`map.layers.${name}`)}>
      <ReactLeafletHeatmapLayer
        latlngs={(flightPoints?.items ?? []) as unknown as HeatLatLngTuple[]}
        // hacked together values
        radius={15}
        maxZoom={19.5}
      />
    </LayersControl.Overlay>
  );
}

export default HeatmapLayer;
