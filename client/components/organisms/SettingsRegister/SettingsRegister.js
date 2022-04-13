import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import { attemptGetUser, attemptUpdateUser } from '_thunks/user';



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

import { validateName } from '_utils/validation';

import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername, validatePassword } from '_utils/validation';
import { attemptRegister } from '_thunks/auth';
import PageLayout from '../PageLayout';
import {  useSelector } from 'react-redux';


export default function Register() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  const [fullname, setFullname] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [fullnameAvailable, setFullnameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [mycity, setMyCity] = useState('');
  const [forest, setForest] = useState('');
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  // const [forestResponse, setForestResponse] = React.useState("");
  // const [responseData, setResponseData] = React.useState([]);

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
 
 
  const resetState = () => {
    setFullname(user.full_name);
    setPhoneNumber(user.phone_number);
    setBirthYear(user.birth_year);
    setEmail(user.username);
    setPassword(user.password);
    setMyCity(user.city);
    setForest(user.forest_id);
    setAcceptedTerms(user.get_update);
  };

  useEffect(() => {
    resetState();
  }, [user.full_name, user.phone_number, user.birthYear,user.username, user.password, user.city, user.forest_id, user.get_update]);

  const updateFullName = e => {
      setFullname(e.target.value);
  };
  const updatePhoneNumber = e => {
    setPhoneNumber(e.target.value);
  };
   const updateBirthYear = e => {
  setBirthYear(e.target.value);
  };
  const updateEmail = e => {
    setEmail(e.target.value);
    };
  const updatePassword = e => {
      setPassword(e.target.value);
      };
   const updateCity = e => {
        setMyCity(e.target.value);
        };
    const updateForest = e => {
        setForest(e.target.value);
          };
    const updateAcceptedTerms = e => {
        setAcceptedTerms(e.target.value);
            };
          
            // const refresh = () => dispatch(attemptGetUser())
            // .then(resetState)
            // .catch(R.identity);
          
              const register  = async (e) => {
                e.preventDefault();
                const updatedUser = {};
            if (fullname) { updatedUser.full_name = fullname; }
            if (phoneNumber) { updatedUser.phone_number = phoneNumber; }
            if (birthYear) { updatedUser.birth_year = birthYear; }
            if (email) { updatedUser.username = email; }
            if (password) { updatedUser.password = password; }
            if (mycity) { updatedUser.city = mycity; }
            if (forest) { updatedUser.forest_id = forest; }
            if (acceptedTerms) { updatedUser.get_update = acceptedTerms; }

            console.log(updatedUser);

            if (!R.isEmpty(updatedUser)) {
              dispatch(attemptUpdateUser(updatedUser))
                .catch(R.identity);
            }
            
          };
        
  useKeyPress('Enter', register);

  // useEffect(() => {
  //   getAllForests();
 
  // }, []);

  // const getAllForests = () => {
  //   request
  //     .get("/api/forest/")
  //     .send()
  //     .then((result) => {
  //       setResponseData(result.body.forests[0]);
  //       setForestResponse(result.body.message);
  //       console.log(responseData);
  //     })
  //     .catch();
  // };

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
   treesIcon={true}
   innerPage={true}
   titleStyle={true}
   title="עדכון"

   >
     <form onSubmit={register}>
    <div dir="rtl">
      <Box className="register">
        <div id="box1">

        <Field className="userNameLabel" >
              <Label >
             שם מלא:
        </Label>
              {/* <Control iconsRight> */}
                  <Input dir="rtl"
                      name="fullname"
                     
                      placeholder =" הקלד/י שם משתמש" required
                      
                      color={fullname ? (fullnameAvailable ? 'success' : 'danger') : undefined}
                     
                      type="text"
                      onChange={updateFullName}/>
             
          </Field>
        
          <Field className="phoneLabel">
            <Label>
              מספר טלפון:
            </Label>
          </Field>
          <Input name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={updatePhoneNumber}
          className="inputStyle" pattern="[0-9]+" placeholder="ספרות בלבד"required
           
          />
          <Field className="ageLabel">
            <Label htmlFor="username">
              שנת לידה:
            </Label>
          </Field>
          
        
          <select name="birthYear"
          value={birthYear}
          onChange={updateBirthYear}
          required id="year" className="inputStyle"  >
          <option value='0'>בחירה</option>
              {generateYearOptions()}
          </select>
          
         
          <Field className="phoneLabel">
            <Label >
              כתובת דואר אלקטרוני
            </Label>
          </Field>
          <Input name="email" dir="ltr"
            type="email"
            value={email}
            onChange={updateEmail}
            className="inputStyle" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="email@..." disabled="disabled" />
          <Field className="phoneLabel">
            <Label>
              סיסמה
            </Label>
          </Field>

          <Input name="password"
          type="password"
          value={password}
          onChange={updatePassword} className="inputStyle"   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="לפחות 8 תווים, לפחות ספרה אחת" required />
          
          <Field className="ageLabel">
            <Label htmlFor="username">
              עיר:
            </Label>
          </Field>

          
          <select  name="mycity" type
          value={mycity}
          onChange={updateCity}
          className="inputStyle" required>
            <option value="2">אחיטוב</option>
    <option value="3">באר שבע</option>
    <option value="4">בית שמש</option>
    <option value="5">ג'לג'וליה</option>
    <option value="6">חדרה</option>
    <option value="7">טייבה</option>
    <option value="8">יד חנה</option>
    <option value="9">ירושלים</option>
    <option value="10">כוכב יאיר-צור יגאל</option>
    <option value="11">כפר סבא</option>
    <option value="12">להבים</option>
    <option value="13">מגל</option>
    <option value="14">מזכרת בתיה</option>
    <option value="15">נהריה</option>
    <option value="16">עכו</option>
    <option value="17">עפולה</option>
    <option value="18">קדימה-צורן</option>
    <option value="19">רהט</option>
    <option value="20">רתמים</option>
    <option value="21">שובל</option>
                
          </select>
          <Field className="ageLabel">
            <Label htmlFor="username">
              חורשה:
            </Label>
          </Field>
        
          
  <select name="forest" onChange={updateForest} className="inputStyle"  required >
    <option value="1">בן זכאי אלעד</option>
    <option value="2">גן הבנים אחיטוב</option>
    <option value="3">נחל כתף</option>
    <option value="4">המסגד ג'לג'וליה</option>
    <option value="5">חורשת ליהי חדרה</option>
    <option value="6">טארק אבו זייד טייבה</option>
    <option value="7">המרפסת יד חנה</option>
    <option value="8">עזרת תורה</option>
    <option value="9">גינת ארבל</option>
    <option value="10">גינת ארבל</option>
    <option value="11">גינת אגוז</option>
    <option value="12">גאולים כפר סבא</option>
    <option value="13">פארק 80 כפר סבא</option>
    <option value="14">שטח קטן להבים</option>
    <option value="15">חורשת הכניסה</option>
    <option value="16">שטח קטן מגל</option>
    <option value="17">נחל עקרון מזכרת בתיה</option>
    <option value="18">שצ״פ שזר 53 נהריה</option>
    <option value="19">תל נפוליאון</option>
    <option value="20">שבטי ישראל עפולה</option>
    <option value="21">גינת אלי כהן עפולה</option>
    <option value="22">הפלמ"ח קדימה</option>
    <option value="23">בית ספר אלחנאן רהט</option>
    <option value="24">מתנ״ס רהט</option>
    <option value="25">שצ"פ 900 רתמים</option>
    <option value="26">גבעה חקלאות שובל</option>
    
  </select>
        </div>
        <label htmlFor="checkbox1" >
          <input className="formCheck" type="checkbox"   name="acceptedTerms"
          onClick={updateAcceptedTerms}
          required/> <span className="spantxt">אשמח לקבל עדכונים על החורשה שלי</span>
        </label>
        <button id="btn-login1" type="submit">שמירה</button>
       
      </Box>
    </div >
    </form>
    </PageLayout>
  );
}





