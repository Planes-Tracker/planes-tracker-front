import RefreshIcon from '@mui/icons-material/Refresh';
import type { ButtonProps } from '@mui/material/Button';
import type { TooltipProps } from '@mui/material/Tooltip';
import { useForkRef } from '@mui/material/utils';
import { useGridRootProps } from '@mui/x-data-grid';
import type { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import React, { forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface GridToolbarRefreshButtonProps {
  refetch: QueryActionCreatorResult<never>;
  slotProps?: {
    button?: Partial<ButtonProps>;
    tooltip?: Partial<TooltipProps>;
  };
}

const GridToolbarRefreshButton = forwardRef<
  HTMLButtonElement,
  GridToolbarRefreshButtonProps
>(function GridToolbarRefreshButton(props, ref) {
  const { refetch, slotProps = {} } = props;
  const buttonProps = slotProps.button ?? {};
  const tooltipProps = slotProps.tooltip ?? {};
  const rootProps = useGridRootProps();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleRef = useForkRef(ref, buttonRef);

  const { t } = useTranslation();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-expect-error this is ok
    refetch();
    buttonProps.onClick?.(event);
  };

  return (
    <>
      <rootProps.slots.baseTooltip
        title={t('components.grid.toolbar.refreshButton.title')}
        enterDelay={1000}
        {...tooltipProps}
        {...rootProps.slotProps?.baseTooltip}
      >
        <rootProps.slots.baseButton
          ref={handleRef}
          size="small"
          startIcon={<RefreshIcon />}
          {...buttonProps}
          onClick={handleOnClick}
          {...rootProps.slotProps?.baseButton}
        >
          {t('components.grid.toolbar.refreshButton.title')}
        </rootProps.slots.baseButton>
      </rootProps.slots.baseTooltip>
    </>
  );
});

export default GridToolbarRefreshButton;
