import {
  Box,
  Container,
  styled,
  Drawer,
  List,
  Toolbar,
  Typography,
  AppBar,
  type BoxProps,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRoute } from 'wouter';

import ListItemLink from '@/components/List/ListItemLink';
import { APP_TITLE, DRAWER_WIDTH } from '@/constants';
import menu from '@/menu';

const PageRoot = styled(Box)(() => ({
  display: 'flex',
  height: '100%',
}));

const ContentRoot = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  width: '100%',
}));

const MainContent = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  width: '100%', // https://mui.com/r/x-data-grid-no-dimensions
  padding: theme.spacing(3),
}));

interface PageContainerProps extends BoxProps {}

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
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
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

      <ContentRoot {...props}>
        <Toolbar />
        <MainContent maxWidth={false} tabIndex={-1}>
          {children}
        </MainContent>
      </ContentRoot>
    </PageRoot>
  );
}

export default PageContainer;
