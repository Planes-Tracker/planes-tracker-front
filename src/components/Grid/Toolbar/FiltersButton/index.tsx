import { ListItemIcon, MenuItem, MenuList, Typography } from '@mui/material';
import { useForkRef } from '@mui/material/utils';
import {
  GridMenu,
  useGridApiContext,
  useGridRootProps,
  type GridToolbarFilterButtonProps,
  gridClasses,
} from '@mui/x-data-grid';
import { isHideMenuKey } from '@mui/x-data-grid/utils/keyboardUtils';
import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { FilterOption } from '@/components/Grid/Toolbar/FiltersButton/types';
import { setFilter } from '@/store/slices/features/flightsGrid';
import { useCurrentGridFilter } from '@/store/slices/features/flightsGrid/hooks';
import type { ApiFilter } from '@/types/api/Filter';

interface GridToolbarFiltersButtonProps extends GridToolbarFilterButtonProps {
  options: FilterOption[];
}

const GridToolbarFiltersButton = forwardRef<
  HTMLButtonElement,
  GridToolbarFiltersButtonProps
>(function GridToolbarFiltersButton(props, ref) {
  const { options, slotProps = {} } = props;
  const buttonProps = slotProps.button ?? {};
  const tooltipProps = slotProps.tooltip ?? {};
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleRef = useForkRef(ref, buttonRef);

  const dispatch = useDispatch();
  const currentFilter = useCurrentGridFilter();

  const handleOnOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen((prevOpen) => !prevOpen);
    buttonProps.onClick?.(event);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleOnUpdate = (newFilter: ApiFilter) => {
    if (newFilter === currentFilter) dispatch(setFilter(null));
    else dispatch(setFilter(newFilter));

    setIsOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
    if (isHideMenuKey(event.key)) {
      setIsOpen(false);
    }
  };

  const title = useMemo(() => {
    return isOpen
      ? apiRef.current.getLocaleText('toolbarFiltersTooltipHide')
      : apiRef.current.getLocaleText('toolbarFiltersTooltipShow');
  }, [apiRef, isOpen]);

  return (
    <>
      <rootProps.slots.baseTooltip
        title={title}
        enterDelay={1000}
        {...tooltipProps}
        {...rootProps.slotProps?.baseTooltip}
      >
        <rootProps.slots.baseButton
          ref={handleRef}
          size="small"
          startIcon={<rootProps.slots.openFilterButtonIcon />}
          {...buttonProps}
          onClick={handleOnOpen}
          {...rootProps.slotProps?.baseButton}
        >
          {apiRef.current.getLocaleText('toolbarFilters')}
        </rootProps.slots.baseButton>
      </rootProps.slots.baseTooltip>
      <GridMenu
        open={isOpen}
        target={buttonRef.current}
        onClose={handleOnClose}
        position="bottom-start"
      >
        <MenuList
          className={gridClasses.menuList}
          onKeyDown={handleListKeyDown}
          autoFocusItem={isOpen}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleOnUpdate(option.value);
              }}
              selected={option.value === currentFilter}
            >
              <Typography display="flex">
                <ListItemIcon>{option.icon}</ListItemIcon> {option.label}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </GridMenu>
    </>
  );
});

export default GridToolbarFiltersButton;
