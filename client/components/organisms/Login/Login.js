import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';

import Box from 'react-bulma-companion/lib/Box';
import Block from 'react-bulma-companion/lib/Block';
import Title from 'react-bulma-companion/lib/Title';
import Control from 'react-bulma-companion/lib/Control';
import Button from 'react-bulma-companion/lib/Button';
import Input from 'react-bulma-companion/lib/Input';
import Checkbox from 'react-bulma-companion/lib/Checkbox';
import TextField from 'react-bulma-companion/lib/TextField';

import useKeyPress from '_hooks/useKeyPress';
import { attemptLogin } from '_thunks/auth';
import FormInput from '_molecules/FormInput';
import { error } from 'jquery';

export default function Login() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setRemember(true);
      setUsername(username);
    }
  }, []);

  const login = (e) => {
    e.preventDefult();
    if (error) {
      return;
    }
    const userCredentials = { username, password };

    if (remember) {
      localStorage.setItem('username', username);
    }

    dispatch(attemptLogin(userCredentials))
      .catch(R.identity);
  };

  useKeyPress('Enter', login);

  const rememberMe = () => {
    localStorage.removeItem('username');
    setRemember(!remember);
  };

  const updateUsername = e => setUsername(e.target.value);
  const updatePassword = e => {
    const { value } = e.target;
    if (value.length < 8) {
      setError('No Chars')
    }
    else {
      setError(null);
    }
    setPassword(value);
  }
  return (

    <Box className="login" onSubmit={login}>

      <label className='user-email-label'>
        כתובת דואר אלקטרוני
      </label>
      <FormInput className="formInput"
        onChange={updateUsername}
        placeholder="email@..."
        value={username}
        type="email"
      />

      <label className='user-password-label'>
        סיסמה
      </label>
      <TextField className="formInput"
        error
        onChange={updatePassword}
        placeholder="לפחות 8 תווים, לפחות ספרה אחת"
        value={password}
        type="password"
        className={error ? 'error-input' : ''}
        helperText="Incorrect entry."

      />
      {error && <span>{error}</span>}

      <div className="operators">
        <Button className="is-pulled-right" type="submit" >
          כניסה
        </Button>
        <Link to="/Login" className='forget-password'>
          שכחתי סיסמה
        </Link>

      </div>
    </Box >

  );
}


