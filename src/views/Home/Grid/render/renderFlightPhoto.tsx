import HideImageIcon from '@mui/icons-material/HideImage';
import { Link, Stack, styled, Typography } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

import type { Flight } from '@/services/flight/types';
import useGetFlightPhoto from '@/views/Home/Grid/hooks/useGetFlightPhoto';

const Photo = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}));

const PhotoLink = styled(Link)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface FlightPhotoProps {
  link?: string;
  src?: string;
}

function FlightPhoto({ link, src }: FlightPhotoProps) {
  const { t } = useTranslation();

  if (src === undefined)
    return (
      <Stack
        width="100%"
        height={120}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <HideImageIcon />
        <Typography>{t('home.grid.missingPhoto')}</Typography>
      </Stack>
    );

  return (
    <PhotoLink href={link} target="_blank" rel="noreferrer">
      <Photo src={src} loading="lazy" referrerPolicy="no-referrer" />
    </PhotoLink>
  );
}

const RenderFlightPhoto = (params: GridRenderCellParams<Flight>) => {
  const { src, link } = useGetFlightPhoto(params.row);

  return <FlightPhoto src={src} link={link} />;
};

export { RenderFlightPhoto as renderFlightPhoto };
export default FlightPhoto;
