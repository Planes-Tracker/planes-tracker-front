import { Alert, Collapse, Link, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLocalStorage } from 'react-use';

const PHOTOS_WARNING_CLOSED_STORAGE_KEY = 'PHOTOS_WARNING_CLOSED';

function PhotosWarning() {
  const [alreadyClosed, setAlreadyClosed] = useLocalStorage(
    PHOTOS_WARNING_CLOSED_STORAGE_KEY,
    false,
  );

  const [open, setOpen] = useState(!alreadyClosed);
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
    <Collapse in={open} unmountOnExit>
      <Alert
        severity="warning"
        onClose={() => {
          setOpen(false);
          setAlreadyClosed(true);
        }}
        sx={{
          mb: 2,
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
    </Collapse>
  );
}

export default PhotosWarning;
