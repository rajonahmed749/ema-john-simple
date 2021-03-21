import './App.css';
import Header from './Components/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Mange from './Manage/Mange';
import Notfound from './Components/Notfound/Notfound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const userContext= createContext()

function App() {
  const [loggedInUser, setLoggedInUser]= useState({})
  
  return (
    <userContext.Provider value= {[loggedInUser, setLoggedInUser]} >
      <h2>Email :  {loggedInUser.email}</h2>
     
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/manage">
            <Mange></Mange>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>

          <Route exact path ="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>

          <Route path="*">
            <Notfound></Notfound>
          </Route>

        </Switch>
      </Router>
      
      
    </userContext.Provider>
  );
}

export default App;