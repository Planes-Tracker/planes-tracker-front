import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  MapContainer as MapContainerRoot,
  TileLayer,
  LayersControl,
} from 'react-leaflet';
import ScaleNautic from 'react-leaflet-nauticsale';

import { useGetMapSettingsQuery } from '@/services/map/api';
import useMapSettings from '@/views/Map/Map/hooks/useMapSettings';
import HeatmapLayer from '@/views/Map/Map/Layer/Heatmap';
import TrailsLayer from '@/views/Map/Map/Layer/Trails';
import SetBoundsCircle from '@/views/Map/Map/SetBoundsCircle';

import 'leaflet/dist/leaflet.css';

const URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MapContainer = styled(MapContainerRoot)(() => ({
  height: '100%',
}));

function FlightsMap() {
  const { data } = useGetMapSettingsQuery();
  const settings = useMapSettings(data);
  const { t } = useTranslation();

  // ToDo: idea, add nearest airports markers around the circle pointing in this direction

  return (
    <MapContainer center={[settings.latitude, settings.longitude]} zoom={2}>
      <TileLayer attribution={ATTRIBUTION} url={URL} />
      <LayersControl position="topright">
        <LayersControl.Overlay checked name={t('map.layers.trackingBounds')}>
          <SetBoundsCircle settings={settings} />
        </LayersControl.Overlay>

        <HeatmapLayer />

        <TrailsLayer />
      </LayersControl>
      <ScaleNautic nautic metric imperial={false} />
    </MapContainer>
  );
}

export default FlightsMap;
