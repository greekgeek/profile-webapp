import { Route } from 'react-router';

export default function RouteWithSubRoutes(route) {
  const TEMPLATE = (
    <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
  )
  return TEMPLATE;
}