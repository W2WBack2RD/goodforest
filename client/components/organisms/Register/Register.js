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
import PageLayout from '../PageLayout';


export default function Register() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [mycity, setMyCity] = useState('');
  const [forest, setForest] = useState('');
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
 


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
 
  // const register = () => {
    //   if (usernameAvailable && passwordValid) {
    //     const newUser = {

    
  
      const register  = async (e) => {
// 
        e.preventDefault();
        {
                const newUser = {
                  'username': username,
                  'phone_number': phoneNumber,
                  'birth_year': birthYear,
                  'email_address': email,
                  'password': password,
                  'city': mycity,
                  'forest_id': forest,
                  'get_update': acceptedTerms
                 
                };
                console.log(newUser);

      dispatch(attemptRegister(newUser))
        .catch(R.identity);
    }
    
    
  };

  useKeyPress('Enter', register);



  const generateYearOptions = () => {
    const arr = [];
  
    const startYear = 1940;
    const endYear = new Date().getFullYear();
  
    for (let i = endYear; i >= startYear; i--) {
      arr.push(<option value={i}>{i}</option>);
    }
  
    return arr;
  };


  return (
   <PageLayout
   TreeeIcon={true}
   innerPage={true}
   titleStyle={true}
   title="הרשמה"

   >
     <form onSubmit={register}>
    <div dir="rtl">
      <Box className="register">
        <div id="box1">

        <Field className="userNameLabel" >
              <Label >
              שם משתמש:
        </Label>
              {/* <Control iconsRight> */}
                  <Input dir="rtl"
                      name="username"
                      placeholder =" הקלד/י שם משתמש" required
                      color={username ? (usernameAvailable ? 'success' : 'danger') : undefined}
                      value={username}
                      type="text"
                      onChange={handleUsernameChange}
                    //  {e => setUsername(e.target.value)}
                  />
                  {/* {username && (
                      <Icon
                          size="small"
                          align="right"
                          color={usernameAvailable ? 'success' : 'danger'}
                      >
                          <FontAwesomeIcon
                              icon={usernameAvailable ? faCheck : faExclamationTriangle}
                          />
                      </Icon>
                  )}
              </Control>
              {username && (
                  <Help color={usernameAvailable ? 'success' : 'danger'}>
                      {usernameMessage}
                  </Help>
              )} */}
          </Field>
        
          <Field className="phoneLabel">
            <Label>
              מספר טלפון:
            </Label>
          </Field>
          <Input name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          className="inputStyle" pattern="[0-9]+" placeholder="ספרות בלבד"required
           
          />
          <Field className="ageLabel">
            <Label htmlFor="username">
              שנת לידה:
            </Label>
          </Field>
          
        
          <select name="birthYear"
          value={birthYear}
          onChange={e => setBirthYear(e.target.value)}
          required id="year" className="inputStyle"  >
          <option value='0'>בחירה</option>
              {generateYearOptions()}
          </select>
          
         
          <Field className="phoneLabel">
            <Label >
              כתובת דואר אלקטרוני
            </Label>
          </Field>
          <Input name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="inputStyle" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="...@email" required/>
          <Field className="phoneLabel">
            <Label>
              סיסמה
            </Label>
          </Field>

          <Input name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange} className="inputStyle"   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="לפחות 8 תווים, לפחות ספרה אחת" required />
          
          <Field className="ageLabel">
            <Label htmlFor="username">
              עיר:
            </Label>
          </Field>

          
          <select  name="mycity" type
          value={mycity}
          onChange={e => setMyCity(e.target.value)}
          className="inputStyle" required>
            <option  value="">עיר</option>
            <option  value="Jerusalem">ירושלים</option>
            <option  value="Tel aviv">תל אביב</option>
          </select>
          <Field className="ageLabel">
            <Label htmlFor="username">
              חורשה:
            </Label>
          </Field>
        
          
  <select name="forest" onChange={e => setForest(e.target.value)} className="inputStyle"  multiple size="1" required >
    <option value="Argentina">חורשה</option>
    <option value="Bolivia">חורשה1</option>
    <option value="Brazil">חורשה2</option>
    
  </select>

          {/* <select name="forest"  value={forest}
          onChange={e => setForest(e.target.value)}
          className="inputStyle" multiple size="1"  required>
                <option value="forest1">חורשה1</option>
                <option value="forest2">חורשה2</option>
                <option value="forest3">חורשה3</option>
                <option value="forest4">חורשה4</option>
                <option value="forest5">חורשה5</option>
        
            </select> */}

 
        </div>
        <label htmlFor="checkbox1" >
          <input className="formCheck" type="checkbox"   name="acceptedTerms"
          onClick={e => setAcceptedTerms(!acceptedTerms)}
          required/> <span className="spantxt">אשמח לקבל עדכונים על החורשה שלי</span>
        </label>
        <button id="btn-login1" type="submit">שמירה</button>
       
      </Box>
    </div >
    </form>
    </PageLayout>
  );
}
