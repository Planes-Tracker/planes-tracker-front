import { Box } from '@mui/material';
import type { LatLngExpression } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { LayerGroup, LayersControl, Polyline } from 'react-leaflet';
import tinycolor from 'tinycolor2';

import { useGetTrailsQuery } from '@/services/map/api';
import useMapLayer from '@/views/Map/Map/hooks/useMapLayer';

// BORROWED FROM https://github.com/wiedehopf/tar1090/blob/1ba7b350b28e29bfc566c339ace3fdaa856467d4/html/defaults.js#L124-L196
const ColorByAlt = {
  // HSL for planes with unknown altitude:
  unknown: { h: 0, s: 0, l: 20 },

  // HSL for planes that are on the ground:
  ground: { h: 220, s: 0, l: 30 },

  air: {
    // These define altitude-to-hue mappings
    // at particular altitudes; the hue
    // for intermediate altitudes that lie
    // between the provided altitudes is linearly
    // interpolated.
    //
    // Mappings must be provided in increasing
    // order of altitude.
    //
    // Altitudes below the first entry use the
    // hue of the first entry; altitudes above
    // the last entry use the hue of the last
    // entry.
    h: [
      { alt: 0, val: 20 }, // orange
      { alt: 2000, val: 32.5 }, // yellow
      { alt: 4000, val: 43 }, // yellow
      { alt: 6000, val: 54 }, // yellow
      { alt: 8000, val: 72 }, // yellow
      { alt: 9000, val: 85 }, // green yellow
      { alt: 11000, val: 140 }, // light green
      { alt: 40000, val: 300 }, // magenta
      { alt: 51000, val: 360 }, // red
    ],
    s: 88,
    l: [
      { h: 0, val: 53 },
      { h: 20, val: 50 },
      { h: 32, val: 54 },
      { h: 40, val: 52 },
      { h: 46, val: 51 },
      { h: 50, val: 46 },
      { h: 60, val: 43 },
      { h: 80, val: 41 },
      { h: 100, val: 41 },
      { h: 120, val: 41 },
      { h: 140, val: 41 },
      { h: 160, val: 40 },
      { h: 180, val: 40 },
      { h: 190, val: 44 },
      { h: 198, val: 50 },
      { h: 200, val: 58 },
      { h: 220, val: 58 },
      { h: 240, val: 58 },
      { h: 255, val: 55 },
      { h: 266, val: 55 },
      { h: 270, val: 58 },
      { h: 280, val: 58 },
      { h: 290, val: 47 },
      { h: 300, val: 43 },
      { h: 310, val: 48 },
      { h: 320, val: 48 },
      { h: 340, val: 52 },
      { h: 360, val: 53 },
    ],
  },
} as const;

// BORROWED FROM https://github.com/wiedehopf/tar1090/blob/1ba7b350b28e29bfc566c339ace3fdaa856467d4/html/planeObject.js#L752-L817
const colorFromAltitude = (altitude?: number) => {
  let h, s, l;

  if (altitude == null) {
    h = ColorByAlt.unknown.h;
    s = ColorByAlt.unknown.s;
    l = ColorByAlt.unknown.l;
  } else if (altitude === 0) {
    h = ColorByAlt.ground.h;
    s = ColorByAlt.ground.s;
    l = ColorByAlt.ground.l;
  } else {
    const altRound = altitude < 8000 ? 50 : 200;
    // round altitude to limit the number of colors used
    altitude = altRound * Math.round(altitude / altRound);

    s = ColorByAlt.air.s;

    // find the pair of points the current altitude lies between,
    // and interpolate the hue between those points
    const hpoints = ColorByAlt.air.h;
    h = hpoints[0].val;
    for (let i = hpoints.length - 1; i >= 0; --i) {
      if (altitude > hpoints[i].alt) {
        if (i == hpoints.length - 1) {
          h = hpoints[i].val;
        } else {
          h =
            hpoints[i].val +
            ((hpoints[i + 1].val - hpoints[i].val) *
              (altitude - hpoints[i].alt)) /
              (hpoints[i + 1].alt - hpoints[i].alt);
        }
        break;
      }
    }
    let lpoints = ColorByAlt.air.l;
    lpoints = lpoints.length ? lpoints : [{ h: 0, val: lpoints }];
    l = lpoints[0].val;
    for (let i = lpoints.length - 1; i >= 0; --i) {
      if (h > lpoints[i].h) {
        if (i == lpoints.length - 1) {
          l = lpoints[i].val;
        } else {
          l =
            lpoints[i].val +
            ((lpoints[i + 1].val - lpoints[i].val) * (h - lpoints[i].h)) /
              (lpoints[i + 1].h - lpoints[i].h);
        }
        break;
      }
    }
  }

  if (h < 0) {
    h = (h % 360) + 360;
  } else if (h >= 360) {
    h = h % 360;
  }

  if (s < 0) s = 0;
  else if (s > 95) s = 95;

  if (l < 0) l = 0;
  else if (l > 95) l = 95;

  return tinycolor({ h, s, l }).toHexString();

  // return [h, s, l];
};

const LAYER_NAME = 'trails';

function TrailsLayer() {
  const { name, isEnabled } = useMapLayer(LAYER_NAME);
  const { t } = useTranslation();

  // ToDo: add backdrop while loading
  const { data } = useGetTrailsQuery(undefined, {
    skip: !isEnabled,
  });

  const trails = data?.items ?? {};

  // Idea: if trail click => reidrect to plain details (in a popup?)

  return (
    <LayersControl.Overlay checked={isEnabled} name={t(`map.layers.${name}`)}>
      <LayerGroup>
        {Object.keys(trails).map((id) => {
          const points = trails[id];

          return points.map(([lat, lon, alt], idx) => {
            if (idx === points.length - 1) return null;
            const start: LatLngExpression = [lat, lon];
            const end: LatLngExpression = points[idx + 1];
            const color = colorFromAltitude(alt);
            return (
              <Polyline
                key={`t-${id}-${idx.toString()}`}
                positions={[start, end]}
                pathOptions={{ color }}
              />
            );
          });
        })}
      </LayerGroup>
      <Box
        sx={{
          display: isEnabled ? 'block' : 'hidden',
          zIndex: 9999,
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-53%)',
          width: '50rem',
        }}
      >
        <img
          // BORROWED FROM https://github.com/wiedehopf/tar1090/blob/master/html/images/alt_legend_ft.svg
          src="/altitude_legend_ft.svg"
          alt="Overlay"
          style={{
            pointerEvents: 'none',
          }}
        />
      </Box>
    </LayersControl.Overlay>
  );
}

export default TrailsLayer;
