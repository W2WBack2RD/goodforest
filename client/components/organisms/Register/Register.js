import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';
import Field from 'react-bulma-companion/lib/Field';
import Input from 'react-bulma-companion/lib/Input';
import Label from 'react-bulma-companion/lib/Label';


import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername, validatePassword } from '_utils/validation';
import { attemptRegister } from '_thunks/auth';
import PageLayout from '../PageLayout';
import { request } from '_api/request';

export function useForestsAndCities() {
  const [forests, setForests] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllForests();
  }, []);

  const getAllForests = () => {
    request
      .get("/api/forest/")
      .send()
      .then((result) => {
        setForests(result.body.forests)
        var cities = result.body.forests.map((forest) => forest.city)
        const uniqCities = cities.filter((obj, idx, arr) => (
          obj && arr.findIndex((o) => o?.id === obj?.id) === idx
        )).sort(function (a, b) {
          var textA = a.name;
          var textB = b.name;
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
        setCities(uniqCities)
      })
      .catch();
  };

  return [forests, cities]
}

export default function Register() {
  const dispatch = useDispatch();

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

  const [forests, cities] = useForestsAndCities()

  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword);

    setPasswordValid(valid);
    setPasswordMessage(message);
  };

  const checkUsername = newUsername => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage('Checking username...');
      setFullnameAvailable(false);

      postCheckUsername(newUsername)
        .then(res => {
          setFullnameAvailable(res.available);
          setUsernameMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setFullnameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = newUserName => {
    setFullname(newUserName);
    checkPassword(newUserName, password);
  };

  const handleUsernameChange = e => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    checkPassword(fullname, e.target.value);
  };


  const register = async (e) => {

    e.preventDefault();
    {
      const newUser = {
        'full_name': fullname,
        'phone_number': phoneNumber,
        'birth_year': birthYear,
        'username': email,
        'password': password,
        'city': mycity,
        'forest': forest,
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
      showMenu={false}
      treesIcon={true}
      innerPage={true}
      titleStyle={true}
      title="הרשמה"

    >
      <form onSubmit={register}>
        <div dir="rtl">
          <div className="register">
            <div id="box1">

              <Field className="userNameLabel" >
                <Label >
                  שם מלא:
                </Label>
                {/* <Control iconsRight> */}
                <Input dir="rtl"
                  name="full_name"
                  placeholder=" הקלד/י שם משתמש" required
                  value={fullname}
                  type="text"
                  onChange={e => setFullname(e.target.value)}

                />

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
                className="inputStyle" pattern="[0-9]+" placeholder="ספרות בלבד" required

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
                  כתובת דואר אלקטרוני:
                </Label>
              </Field>
              <Input name="email"
                type="email"
                color={fullname ? (fullnameAvailable ? 'success' : 'danger') : undefined}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="inputStyle" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="...@email" required />
              <Field className="phoneLabel">
                <Label>
                  סיסמה:
                </Label>
              </Field>

              <Input name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange} className="inputStyle" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="לפחות 8 תווים, לפחות ספרה אחת" required />

              <Field className="ageLabel">
                <Label htmlFor="username">
                  עיר:
                </Label>
              </Field>


              <select name="mycity"
                value={mycity}
                onChange={e => setMyCity(e.target.value)}
                className="inputStyle" required>

                <option value="">עיר</option>
                {cities.map((cityOption) =>
                  (<option value={cityOption.id}>{cityOption.name}</option>))}
              </select>
              <Field className="ageLabel">
                <Label htmlFor="username">
                  חורשה:
                </Label>
              </Field>

              <select name="forest" onChange={e => setForest(e.target.value)} className="inputStyle" required >
                <option value="">חורשה</option>
                {forests.filter(forest => forest.city?.id === mycity).map((forestOption) =>
                  (<option value={forestOption.id}>{forestOption.forest_name}</option>))}

              </select>

            </div>
            <label htmlFor="checkbox1" >
              <input className="formCheck" type="checkbox" name="acceptedTerms"
                onClick={e => setAcceptedTerms(!acceptedTerms)}
              /> <span className="spantxt">אשמח לקבל עדכונים על החורשה שלי</span>
            </label>
            <button id="btn-login1" type="submit">שמירה</button>

          </div>
        </div >
      </form>
    </PageLayout>
  );
}
