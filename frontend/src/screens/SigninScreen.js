import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      // console.log(data);
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/'); // redirect or go to home page
      //we got redirect from URLSearchParams
      //this is navigate('/signin?redirect=/shipping'); from cart screen
      //which means go to shippinng if sign in
      //attention we come to this page directly and not from proceed to check out button
      //there is no redirect and we will navigate to home page for buy something
      //console.log(data);
    } catch (err) {
      toast.error(getError(err));
      // alert('Invalid email or password');
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect); //we have it from URLSearchParams and will go to shipping
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Sign-In</h2>
            </li>
            <li>
              {/* {loading && <div>Loading...</div>}
            {error && <div>{error}</div>} */}
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </li>
            <li>
              <button type="submit" className="button primary">
                Signin
              </button>
            </li>
            <li>New Customer?</li>
            <li>
              <Link
                to={`/singup?redirect=${redirect}`}
                className="button secondary text-center"
              >
                Create your account
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default SigninScreen;
