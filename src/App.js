import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Layout from 'layout/default';

import Home from 'pages/Home';
import Help from 'pages/Help';
import AboutUs from 'pages/AboutUs';
import products from 'pages/products';
import Platforms from 'pages/Platforms';
import ProductsDetail from 'pages/products/Detail';
import Promotions from 'pages/Accounts/Promotions';
import AccountTypes from 'pages/Accounts/Account-types';
import Resources from 'pages/Resources';
// import register_real_account from 'pages/register_real_account'

import Loading from 'components/Loading'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <StyledEngineProvider injectFirst>
        <Router>
          <Layout>
            <Switch>
              <Route exact path='/' component={Home} />

              <Route exact path='/About-us' component={AboutUs} />

              <Route exact path='/Platforms' component={Platforms} />

              <Route exact path='/Products/:type' component={products} />
              <Route exact path='/Products/:type/Detail' component={ProductsDetail} />

              <Route exact path='/Accounts/Account-Types' component={AccountTypes} />
              <Route exact path='/Accounts/Promotions' component={Promotions} />

              <Route exact path='/Resources/:page' component={Resources} />
              <Route exact path='/Resources/:page/:id' component={Resources} />

              <Route exact path='/Help' component={Help} />

              {/* <Route exact path='/register-real-account' component={register_real_account} /> */}
            </Switch>
          </Layout>
        </Router>
      </StyledEngineProvider>
    </Suspense>
  )
};

export default App;
