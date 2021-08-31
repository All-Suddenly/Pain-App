import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  DashboardPage,
  FourOhFour,
  LandingPage,
  TrackerPage,
} from '../../pages';

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/tracker/:id" component={TrackerPage} />
        <Route path="*" component={FourOhFour} />
      </Switch>
    </Router>
  );
}
