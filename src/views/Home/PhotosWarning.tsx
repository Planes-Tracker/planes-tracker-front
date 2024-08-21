import { Alert, Box, Collapse, Link, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

function PhotosWarning() {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  const planespottersLink = useMemo(
    () => (
      <Link
        href="https://www.planespotters.net/"
        target="_blank"
        rel="noreferrer"
      >
        Planespotters.net
      </Link>
    ),
    [],
  );

  return (
    <Collapse in={open}>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Alert
          severity="warning"
          onClose={() => {
            setOpen(false);
          }}
        >
          <Typography>
            <Trans i18nKey="home.photosWarning.0">
              The plane photos featured on this site are sourced from{' '}
              {planespottersLink}. The photographers retain all rights to these
              images. Please be aware that:
            </Trans>
          </Typography>
          <ul>
            <li>
              <Typography>{t('home.photosWarning.1')}</Typography>
            </li>
            <li>
              <Typography>{t('home.photosWarning.2')}</Typography>
            </li>
          </ul>
          <Typography>
            <Trans i18nKey="home.photosWarning.3">
              Visit {planespottersLink} for more details.
            </Trans>
          </Typography>
        </Alert>
      </Box>
    </Collapse>
  );
}

export default PhotosWarning;
