import logo from './logo.svg';
import './App.scss';
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
import Login from './pages/ADMIN/Login'
import DashBoard from './pages/ADMIN/Dashboard'
import ViewProducts from './pages/ADMIN/Products'
import ProductList from './pages/ADMIN/Products/ProductList'
import AdminProduct from './pages/ADMIN/Product'
import AddProduct from './pages/ADMIN/Products/AddProduct'

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
            <Paying />
          </Route>
           <Route path='/checkout/pay'>

            <Pay />
          </Route>
          <Route path='/profile'>
            <Products content={<Profile />} />              
          </Route>
          <Route exact path='/admin' >
                <Login />
          </Route>
          <Route path='/admin/dashboard' >
                <DashBoard />
          </Route>
          <Route path='/admin/products' >
                <ViewProducts content={<ProductList />} />
          </Route>
          <Route path='/admin/product' >
                <ViewProducts content={<AdminProduct />} />
          </Route>
          <Route path='/admin/addproduct' >
                <ViewProducts content={<AddProduct />} />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
