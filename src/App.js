import logo from './logo.svg';
import {useState} from 'react'
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
import ProtectedRoute from './hooks/ProtectedRoute'
import {ProductContext} from './hooks/userContext.js'
import {PrefferedCurrency} from './hooks/userContext.js'
import Order from './pages/ADMIN/Order';
import Reset from './pages/registration/components/reset';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
function App() {

const [products,setProducts]=useState([])
const [userCurrency,setUserCurrency]=useState('USD')
      

  return (
    <PrefferedCurrency.Provider value={{userCurrency,setUserCurrency}}>
    <ProductContext.Provider value={{products,setProducts}}>
    <Router>
      <Switch>
          <Route exact path="/auth">
            <Registration />
          </Route>
          <Route path='/successfulVerification'>
            <VerificationSuccessful />
          </Route>
          <Route path='/products'>
            <Products><ProductsContainer /></Products>

          </Route>
          <Route exact path='/product'>
            <Products>
                 <Product /> 
            </Products>
          </Route>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route exact path='/contact-us'>
            <Contact />
          </Route>
          <Route exact path='/checkout' >
            <Payment />
          </Route>
          <Route path='/checkout/paid'>
            <Paying />
          </Route>
           <Route path='/checkout/pay'>

            <Pay />
          </Route>
          <Route path='/profile'>
            <Products><Profile /></Products>              
          </Route>
          <Route exact path='/admin' >
                <Login />
          </Route>
          <Route path='/reset-password'>
              <Reset/>
          </Route>
          <ProtectedRoute path='/admin/dashboard' component={DashBoard }/>
          <ProtectedRoute path='/admin/products'  component={ProductList }/>
          <ProtectedRoute path='/admin/product'   component= {AdminProduct}  />
          <ProtectedRoute path='/admin/addproduct'   component={AddProduct}/>
          <ProtectedRoute path='/admin/see-order'   component={Order}/>
         


      </Switch>
    </Router>
    </ProductContext.Provider>
    </PrefferedCurrency.Provider>
  );
}

export default App;
