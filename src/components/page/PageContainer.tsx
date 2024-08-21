import {
  Box,
  Container,
  styled,
  Drawer,
  List,
  Toolbar,
  Typography,
  AppBar,
  type ContainerProps,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRoute } from 'wouter';

import ListItemLink from '@/components/List/ListItemLink';
import { APP_TITLE } from '@/constants';
import menu from '@/menu';

const PageRoot = styled(Box)(() => ({
  display: 'flex',
  minHeight: '100vh',
  boxSizing: 'border-box',
}));

const PageContainerRoot = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 'auto',
  overflowX: 'auto',
}));

interface PageContainerProps extends ContainerProps {}

const drawerWidth = 240;

function PageContainer({ children, ...props }: PageContainerProps) {
  const { t } = useTranslation();

  return (
    <PageRoot>
      <AppBar
        // variant="outlined"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // color: (theme) => theme.palette.text.primary,
          // backgroundColor: 'white',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            {APP_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menu.map((item) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [match] = useRoute(item.to);
              return (
                <ListItemLink
                  disablePadding
                  key={item.label}
                  icon={item.icon}
                  primary={t(`menu.${item.label}`)}
                  selected={match}
                  href={item.to}
                />
              );
            })}
          </List>
        </Box>
      </Drawer>

      <PageContainerRoot maxWidth={false} tabIndex={-1} {...props}>
        <Toolbar sx={{ marginBottom: '1rem' }} />
        {children}
      </PageContainerRoot>
    </PageRoot>
  );
}

export default PageContainer;
