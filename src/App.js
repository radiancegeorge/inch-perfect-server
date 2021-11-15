import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from './pages/registration/Registration';
import VerificationSuccessful from './pages/registration/components/verificationSuccessful'
import Products from './pages/products';
import Product from './pages/product';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/auth">
            <Registration />
          </Route>
          <Route path='/successfulVerification'>
            <VerificationSuccessful />
          </Route>
          <Route exact path='/product/:id'>
            <Product />
          </Route>
          <Route path='/'>
            <Products />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
