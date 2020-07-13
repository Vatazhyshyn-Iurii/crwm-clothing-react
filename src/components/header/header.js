import React from "react";
import './header.scss';
import {Link} from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import {connect} from "react-redux";
import CartIcon from "../cart-icon-component/cart-icon-component";
import CartDropdown from "../cart-dropdown/cart-dropdown";

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link to='/' className='logo-container'>
      <Logo className='logo' />
    </Link>
    <div className="options">
      <Link to='/shop' className="option">
        SHOP
      </Link>
      <Link to='/shop' className="option">
        CONTACT
      </Link>
      {
        currentUser
          ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
          : <Link to='/signin' className='option'>SIGN IN</Link>
      }
      <CartIcon />
    </div>
    { !hidden && <CartDropdown /> }
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);