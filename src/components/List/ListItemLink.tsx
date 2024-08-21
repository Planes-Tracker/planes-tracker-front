import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type ListItemButtonProps,
  type ListItemProps,
  type ListItemTextProps,
  type ListItemIconProps,
} from '@mui/material';
import { forwardRef, useMemo } from 'react';

import type { LinkProps } from '@/components/navigation/Link';
import Link from '@/components/navigation/Link';

interface ListItemLinkPros {
  disablePadding: ListItemProps['disablePadding'];
  icon: ListItemIconProps['children'];
  primary: ListItemTextProps['primary'];
  selected: ListItemButtonProps['selected'];
  href: LinkProps['href'];
}

function ListItemLink({
  disablePadding,
  icon,
  primary,
  selected,
  href,
}: ListItemLinkPros) {
  const CustomLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<LinkProps, 'href'>>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function CustomLink(linkProps, _ref) {
          return <Link href={href} {...linkProps} />;
        },
      ),
    [href],
  );

  return (
    <ListItem
      disablePadding={disablePadding}
      component={CustomLink}
      sx={{
        color: (theme) =>
          selected ? theme.palette.text.primary : theme.palette.text.secondary,
      }}
    >
      <ListItemButton selected={selected}>
        <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListItemLink;
