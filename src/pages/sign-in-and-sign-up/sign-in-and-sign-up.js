import React from "react";
import './sign-in-and-sign-up.scss';
import SighIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

const SighInAndSignUp = () => (
  <div className='sign-in-and-sign-up'>
    <SighIn />
    <SignUp />
  </div>
);

export default SighInAndSignUp;
