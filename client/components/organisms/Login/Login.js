
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import { GoogleLogin } from 'react-google-login'; import Button from 'react-bulma-companion/lib/Button';
import Field from 'react-bulma-companion/lib/Field';
import Control from 'react-bulma-companion/lib/Control';
import Input from 'react-bulma-companion/lib/Input';
import Help from 'react-bulma-companion/lib/Help';

import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername } from '_utils/validation';
import { attemptGoogleLogin } from '_thunks/auth';
import PageLayout from '../PageLayout';
import { attemptLogin } from '_thunks/auth';

export default function Register() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkUsername = newUsername => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage('Checking username...');

      postCheckUsername(newUsername)
        .then(res => {
          setUsernameMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setUsernameMessage(message);
    }
  };

  const updateUsername = newUserName => {
    setUsername(newUserName);
  };

  const handleUsernameChange = e => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const login = () => {
    const userCredentials = { username, password };

    dispatch(attemptLogin(userCredentials))
      .catch(() => {
        setError('שם המשתמש או הסיסמה לא נכונים')
      });
  };

  const googleLogin = (googleData) => {
    dispatch(attemptGoogleLogin(googleData))
      .catch(() => {
        setError('שם המשתמש או הסיסמה לא נכונים')
      });
  };

  useKeyPress('Enter', login);
  return (
    <PageLayout className="login" treesIcon={true} showMenu={false} innerPage={true} titleStyle={true} title="התחברות">
      <p className='user-email-label'>
        כתובת דואר אלקטרוני
      </p>
      <Field>
        <Control iconsRight className="Control">
          <Input className="formInput"
            id="username"
            placeholder="email@..."
            value={username}
            onChange={handleUsernameChange}
            type="email"
          />
        </Control>
      </Field>
      <Field>
        <p htmlFor="password" className='user-password-label'>
          סיסמה
        </p>
        <Control iconsRight>
          <Input className="formInput"
            id="password"
            placeholder="הקלידו סיסמה"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Control>
      </Field>

      <div className="operators">
        <Button className="is-pulled-right" style={{ marginBotton: 4 }} type="submit" color="success" onClick={login} disabled={!password || !username}>
          כניסה
        </Button>
      </div>
      {error && (
        <Help color='danger'>
          {error}
        </Help>
      )}

      {/* <div className='center'>
        <GoogleLogin
          clientId="654838528427-fjnmug2al8h0k0tahll8uormoor5fmok.apps.googleusercontent.com"
          buttonText="Sign-in with Google"
          onSuccess={googleLogin}
          onFailure={googleLogin}
          cookiePolicy={'single_host_origin'}
        />
      </div> */}

    </PageLayout>
  );
}
