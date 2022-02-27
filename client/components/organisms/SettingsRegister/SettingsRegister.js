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


export default function SettingsRegister() {
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
 
  

  class UpdateRegister extends React.Component {
    state = {
      username: '',
      phoneNumber: '',
      birthYear: "0",
      email: "0",
      password: null,
      mycity: [],
      forest:  [],
      acceptedTerms: null,

    }

    handleChange = (e) => {
      console.log('value:', e.target.value)
      console.log('options:', e.target.options)
      console.log('type:', e.target.type)
      let value = e.target.value
      if(e.target.type === 'number') {
        value = parseInt(e.target.value)
      }
  
      this.setState({[e.target.name]: value})
    }

       
  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      username: this.state. username,
      phoneNumber: this.state.phoneNumber,
      birthYear: this.state.birthYear,
      email: this.state. email,
      password: this.state.password,
      mycity: this.state.mycity,
      forest: this.state.forest,
      acceptedTerms: this.state.  acceptedTerms,
    
    }

    if (newUser.name) {
      this.props.UpdateRegister(newUser)
    } else {
      alert('Please fix all errors. ')
    }
  }





      
    
//   const settingsRegister = () => {
//     if (usernameAvailable && passwordValid) {
//       const newUser = {
//         'UserName': username,
//         'PhoneNumber': phoneNumber,
//         'BirthYear': birthYear,
//         'Email': email,
//         'Password': password,
//         'City': mycity,
//         'Forest': forest,
        // 'AcceptedTerms': acceptedTerms
       
      };
      
      dispatch(attemptRegister(newUser))
        .catch(R.identity);
        
//     }
//     console.log(newUser);
   
//   };

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
   
    <div dir="rtl">
      <Box className="register">
        <div id="box1">
          <Field class="userNameLabel">
            <Label >
              שם משתמש:
            </Label>
          </Field>
          <Input name="username"
          type="username"
          value={username}
          onChange={this.handleChange}
           class="inputStyle" placeholder=" הקלד/י שם משתמש" required />
          
          <Field class="phoneLabel">
            <Label>
              מספר טלפון:
            </Label>
          </Field>
          <Input name="phoneNumber"
          type="phoneNumber"
          value={phoneNumber}
          onChange={this.handleChange}
           class="inputStyle" pattern="[0-9]+" placeholder="ספרות בלבד"required
           
          />
          <Field class="ageLabel">
            <Label htmlFor="username">
              שנת לידה:
            </Label>
          </Field>
          
        
          <select name="birthYear"
          value={birthYear}
          onChange={this.handleChange}
          required id="year" class="inputStyle"  >
          <option value='0'>בחירה</option>
              {generateYearOptions()}
          </select>
          
         
          <Field class="phoneLabel">
            <Label >
              כתובת דואר אלקטרוני
            </Label>
          </Field>
          <Input name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
           class="inputStyle" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="...@email" disabled/>
          <Field class="phoneLabel">
            <Label>
              סיסמה
            </Label>
          </Field>

          <Input name="password"
          type="password"
          value={password}
          onChange={this.handleChange} class="inputStyle"   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="לפחות 8 תווים, לפחות ספרה אחת" required />
          
          <Field class="ageLabel">
            <Label htmlFor="username">
              עיר:
            </Label>
          </Field>
          <select  name="mycity"
          value={mycity}
          onChange={this.handleChange}
           class="inputStyle" required>
            <option  value="">עיר</option>
            <option  value="Jerusalem">ירושלים</option>
            <option  value="Tel aviv">תל אביב</option>
          </select>
          <Field class="ageLabel">
            <Label htmlFor="username">
              חורשה:
            </Label>
          </Field>
          <select name="forest"
          value={forest}
          onChange={this.handleChange}
           class="inputStyle" required>
            <option value="One">חורשה</option>
            <option value="Two">חורשה</option>
            <option value="Three">חורשה</option>
  
          </select>
 
        </div>
        <label for="checkbox1" >
          <input class="formCheck" type="checkbox"   name="acceptedTerms"
          onChange={this.handleChange}
          required/> <span class="spantxt">אשמח לקבל עדכונים על החורשה שלי</span>
        </label>
          <button  onSubmit={this.handleSubmit} >שמירה</button>
      </Box>
    </div >
   
  );
}
