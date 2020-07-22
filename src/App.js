import React, {Component} from "react";
import './App.css';
import HomePage from "./pages/homepage/homePage";
import {Redirect, Route, Switch} from "react-router-dom";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SighInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selectors";
import Checkout from "./pages/checkout/checkout";
import {checkUserSession} from "./redux/user/user-actions";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={Checkout}/>
          <Route
            exact path='/signin'
            render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SighInAndSignUp />)}
          />
        </Switch>
      </div>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
