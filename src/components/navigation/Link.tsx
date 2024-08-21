import { Link as MaterialLink } from '@mui/material';
import type { LinkProps as MaterialLinkProps } from '@mui/material/Link';
import { Link as WouterLink } from 'wouter';

export interface LinkProps extends MaterialLinkProps {}

function Link(props: LinkProps) {
  return <MaterialLink component={WouterLink} {...props} />;
}

export default Link;
