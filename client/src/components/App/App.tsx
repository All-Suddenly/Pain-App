import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  DashboardPage,
  FourOhFour,
  LandingPage,
  TrackerPage,
} from '../../pages';
import { NavigationBar } from '../NavigationBar';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavigationBar />
        <main>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/tracker/:id" component={TrackerPage} />
            <Route path="*" component={FourOhFour} />
          </Switch>
        </main>
      </Router>
    </QueryClientProvider>
  );
}
