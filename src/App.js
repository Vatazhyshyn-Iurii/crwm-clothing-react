import React, {Component} from "react";
import './App.css';
import HomePage from "./pages/homepage/homePage";
import {Redirect, Route, Switch} from "react-router-dom";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SighInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {connect} from "react-redux";
import {setCurrentUser} from './redux/user-actions';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async ( userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
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
          <Route
            exact path='/signin'
            render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SighInAndSignUp />)}
          />
        </Switch>
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
