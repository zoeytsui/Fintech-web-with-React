import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'layout/default';

import Home from 'pages/Home';
import Help from 'pages/Help';
import about_us from 'pages/about_us';
import products from 'pages/products';
import platforms from 'pages/platforms';
import Detail from 'pages/products/Detail';
import Promotions from 'pages/Accounts/Promotions';
import AccountTypes from 'pages/Accounts/Account-types';
import Resources from 'pages/Resources';
import register_real_account from 'pages/register_real_account'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading...</h3>
  </div>
)

const App = () => {
  return (
    <Suspense fallback={loadingMarkup}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />

            <Route exact path='/About-us' component={about_us} />

            <Route exact path='/Platforms' component={platforms} />

            <Route exact path='/Products/:id' component={products} />
            <Route exact path='/Products/:id/Detail' component={Detail} />

            <Route exact path='/Accounts/Account-Types' component={AccountTypes} />
            <Route exact path='/Accounts/Promotions' component={Promotions} />

            <Route exact path='/Resources/:id' component={Resources} />
            <Route exact path='/Resources/:id/:product' component={Resources} />

            <Route exact path='/Help' component={Help} />

            <Route exact path='/register-real-account' component={register_real_account} />
          </Switch>
        </Layout>
      </Router>
    </Suspense>
  )
};

export default App;
