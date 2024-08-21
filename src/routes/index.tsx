import { Route, Switch } from 'wouter';

import routes from '@/routes/routes';
import Home from '@/views/Home';
import Map from '@/views/Map';

function Router() {
  return (
    <Switch>
      <Route path={routes.index} component={Home} />
      <Route path={routes.map} component={Map} />
      <Route>404: No such page!</Route>
    </Switch>
  );
}

export default Router;
