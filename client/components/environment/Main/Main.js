import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router";
import ReactNotification from "react-notifications-component";
import { useDispatch } from "react-redux";
import R from "ramda";

import { attemptGetUser } from "_thunks/user";

import WelcomePage from "_pages/WelcomePage";
import LoginPage from "_pages/LoginPage";
import RegisterPage from "_pages/RegisterPage";
import SettingsRegisterPage from "_pages/SettingsRegisterPage";
import HomePage from "_pages/HomePage";
import TodoPage from "_pages/TodoPage";
import ReportTreePage from "_pages/ReportTreePage";
import SettingsPage from "_pages/SettingsPage";
import LostPage from "_pages/LostPage";

import Navigation from "_organisms/Navigation";
import Footer from "_organisms/Footer";
import PageLayout from "../../organisms/PageLayout";


export default function Main({ location }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscribed = true;

    dispatch(attemptGetUser())
      .then(() => subscribed && setLoading(false))
      .catch(R.identity);

    return () => {
      subscribed = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);



  return (
    !loading && (
      <div>
        <ReactNotification />

        <div className="main">
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/todo" component={TodoPage} />
<<<<<<< HEAD
            <Route path="/settings" component={SettingsPage} />
=======
            <Route path="/settingsRegister" component={SettingsRegisterPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/reportTree" component={ReportTreePage} />
>>>>>>> ee37dfffee80aac4c60fafe1109414356bb73293
            <Route path="*" component={LostPage} />
          </Switch>
        </div>
      </div>
    )

  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

