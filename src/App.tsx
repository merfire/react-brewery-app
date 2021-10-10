import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Breweries from './breweries/breweries-page/Breweries';
import BreweryDetails from './breweries/brewery-details/BreweryDetails';
import Favorites from './favorites/Favorites';
import { Home } from './home/Home';
import BackToHome from './shared/components/back-to-home/BackToHome';
import { NoMatch } from './shared/components/NoMatch';

export default function App() {
  return (
    <Router>
      <DefaultLayout></DefaultLayout>
    </Router>
  );
}

export function DefaultLayout() {
  return (
    <>
      <Routes></Routes>
      <BackToHome></BackToHome>
    </>
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/breweries/:id">
        <BreweryDetails />
      </Route>
      <Route path="/breweries">
        <Breweries />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
      <Route path="/dashboard">
        <Home />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
