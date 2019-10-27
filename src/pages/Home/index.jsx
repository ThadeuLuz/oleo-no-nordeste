import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Ajudar from "../../components/Ajudar";
import Layout from "../../components/Layout";
import LocalidadeList from "../../components/LocalidadeList";

const LocalidadesPage = () => (
  <Router>
    <Layout title="Localidades">
      <Switch>
        <Route exact path="/">
          <LocalidadeList />
        </Route>
        <Route path="/ajudar">
          <Ajudar />
        </Route>
      </Switch>
    </Layout>
  </Router>
);

export default LocalidadesPage;
