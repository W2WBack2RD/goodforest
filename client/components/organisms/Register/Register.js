import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import R from 'ramda';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import Box from 'react-bulma-companion/lib/Box';
import Button from 'react-bulma-companion/lib/Button';
import Title from 'react-bulma-companion/lib/Title';
import Field from 'react-bulma-companion/lib/Field';
import Control from 'react-bulma-companion/lib/Control';
import Icon from 'react-bulma-companion/lib/Icon';
import Input from 'react-bulma-companion/lib/Input';
import Label from 'react-bulma-companion/lib/Label';
import Help from 'react-bulma-companion/lib/Help';

import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername, validatePassword } from '_utils/validation';
import { attemptRegister } from '_thunks/auth';


export default function Register() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword);

    setPasswordValid(valid);
    setPasswordMessage(message);
  };

  const checkUsername = newUsername => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage('Checking username...');
      setUsernameAvailable(false);

      postCheckUsername(newUsername)
        .then(res => {
          setUsernameAvailable(res.available);
          setUsernameMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setUsernameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = newUserName => {
    setUsername(newUserName);
    checkPassword(newUserName, password);
  };

  const handleUsernameChange = e => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    checkPassword(username, e.target.value);
  };

  const register = () => {
    if (usernameAvailable && passwordValid) {
      const newUser = {
        username,
        password,
      };

      

      dispatch(attemptRegister(newUser))
        .catch(R.identity);
    }
  };

  const generateYearOptions = () => {
    const arr = [];
  
    const startYear = 1940;
    const endYear = new Date().getFullYear();
  
    for (let i = endYear; i >= startYear; i--) {
      arr.push(<option value={i}>{i}</option>);
    }
  
    return arr;
  };

  useKeyPress('Enter', register);
  return (
    <div dir="rtl">
      <Box className="register">
        <div id="box1">
          <Field class="userNameLabel">
            <Label >
              שם משתמש:
            </Label>
          </Field>
          <Input type="text" class="inputStyle" pattern=".{8,}" placeholder=" הקלד/י שם משתמש" required />
          
          <Field class="phoneLabel">
            <Label>
              מספר טלפון:
            </Label>
          </Field>
          <Input class="inputStyle" pattern="[0-9]+" placeholder="ספרות בלבד"required 
          />
          <Field class="ageLabel">
            <Label htmlFor="username">
              שנת לידה:
            </Label>
          </Field>

          <select id="year" class="inputStyle"  >
          <option value='0'>בחירה</option>
              {generateYearOptions()}
          </select>
          
         
          <Field class="phoneLabel">
            <Label >
              כתובת דואר אלקטרוני
            </Label>
          </Field>
          <Input class="inputStyle" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="...@email" required/>
          <Field class="phoneLabel">
            <Label>
              סיסמה
            </Label>
          </Field>
          <Input class="inputStyle" type="text" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"  placeholder="לפחות 8 תווים, לפחות ספרה אחת" required />
          <Field class="ageLabel">
            <Label htmlFor="username">
              עיר:
            </Label>
          </Field>
          <select class="inputStyle" >
            <option value="">עיר</option>
            <option value="">ירושלים</option>
            <option value="">תל אביב</option>
          </select>
          <Field class="ageLabel">
            <Label htmlFor="username">
              חורשה:
            </Label>
          </Field>
          <select class="inputStyle" >
            <option value="">חורשה</option>
            <option value="">חורשה</option>
            <option value="">חורשה</option>
          </select>
        </div>
        <label for="checkbox1" >
          <input class="formCheck" type="checkbox" /><span class="spantxt">אשמח לקבל עדכונים על החורשה שלי</span>
        </label>
          <button class="button" >שמירה</button>
      </Box>
    </div >
  );
}
