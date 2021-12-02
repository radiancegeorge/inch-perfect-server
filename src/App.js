import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from './pages/registration/Registration';
import VerificationSuccessful from './pages/registration/components/verificationSuccessful'
import Products from './pages/products';
import Payment from './pages/Payment';
import Paying from './pages/Payment/Paying';
import Pay from './pages/Payment/Pay';

import Profile from './pages/Profile';

import ProductsContainer from './pages/products/ProductsContainer';

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
          <Route exact path='/product'>
            <Products content={<Product />} />
          </Route>
          <Route exact path='/'>
            <Products content={<ProductsContainer />} />
          </Route>
          <Route exact path='/checkout'>
            <Products content={<Payment />} />              
          </Route>
          <Route path='/checkout/paid'>
            {/* <Products content={<Payment />} />               */}
            <Paying />
          </Route>
           <Route path='/checkout/pay'>
            {/* <Products content={<Payment />} />               */}
            <Pay />
          </Route>
          <Route path='/profile'>
            <Products content={<Profile />} />              
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
