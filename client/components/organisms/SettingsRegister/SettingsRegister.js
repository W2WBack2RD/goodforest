import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import R from "ramda";
import { attemptGetUser, attemptUpdateUser } from "_thunks/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

import Box from "react-bulma-companion/lib/Box";
import Button from "react-bulma-companion/lib/Button";
import Title from "react-bulma-companion/lib/Title";
import Field from "react-bulma-companion/lib/Field";
import Control from "react-bulma-companion/lib/Control";
import Icon from "react-bulma-companion/lib/Icon";
import Input from "react-bulma-companion/lib/Input";
import Label from "react-bulma-companion/lib/Label";
import Help from "react-bulma-companion/lib/Help";

import { validateName } from "_utils/validation";

import useKeyPress from "_hooks/useKeyPress";
import { postCheckUsername } from "_api/users";
import { validateUsername, validatePassword } from "_utils/validation";
import { attemptRegister } from "_thunks/auth";
import PageLayout from "../PageLayout";
import { useSelector } from "react-redux";
import { request } from "_api/request";

export default function Register() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  const [fullname, setFullname] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [fullnameAvailable, setFullnameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [mycity, setMyCity] = useState("");
  const [forest, setForest] = useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);


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
          arr.findIndex((o) => o.id === obj.id) === idx
        ))
        setCities(uniqCities)
      })
      .catch();
  };

  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword);

    setPasswordValid(valid);
    setPasswordMessage(message);
  };

  const checkUsername = (newUsername) => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage("Checking username...");
      setUsernameAvailable(false);

      postCheckUsername(newUsername)
        .then((res) => {
          setUsernameAvailable(res.available);
          setUsernameMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setUsernameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = (newUserName) => {
    setUsername(newUserName);
    checkPassword(newUserName, password);
  };

  const handleUsernameChange = (e) => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPassword(username, e.target.value);
  };

  const resetState = () => {
    console.log('I reset according to this ->', user)
    setFullname(user.fullName);
    setPhoneNumber(user.phoneNumber);
    setBirthYear(user.birthYear);
    setEmail(user.username);
    setPassword(user.password);
    setMyCity(user.city);
    setForest(user.forest);
    setAcceptedTerms(user.getUpdate);
  };

  useEffect(() => {
    resetState();
  }, [
    user
  ]);

  const updateFullName = (e) => {
    setFullname(e.target.value);
  };
  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const updateBirthYear = (e) => {
    setBirthYear(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateCity = (e) => {
    setMyCity(e.target.value);
  };
  const updateForest = (e) => {
    setForest(e.target.value);
  };
  const updateAcceptedTerms = (e) => {
    setAcceptedTerms(e.target.value);
  };

  // const refresh = () => dispatch(attemptGetUser())
  // .then(resetState)
  // .catch(R.identity);

  const register = async (e) => {
    e.preventDefault();
    const updatedUser = {};
    if (fullname) {
      updatedUser.full_name = fullname;
    }
    if (phoneNumber) {
      updatedUser.phone_number = phoneNumber;
    }
    if (birthYear) {
      updatedUser.birth_year = birthYear;
    }
    if (email) {
      updatedUser.username = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (mycity) {
      updatedUser.city = mycity;
    }
    if (forest) {
      updatedUser.forest = forest;
    }
    if (acceptedTerms) {
      updatedUser.get_update = acceptedTerms;
    }

    console.log(updatedUser);

    if (!R.isEmpty(updatedUser)) {
      dispatch(attemptUpdateUser(updatedUser)).catch(R.identity);
    }
  };

  useKeyPress("Enter", register);

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
      TreesIcon={true}
      innerPage={true}
      titleStyle={true}
      title="עדכון"
    >
      <form onSubmit={register}>
        <div dir="rtl">
          <Box className="register">
            <div id="box1">
              <Field className="userNameLabel">
                <Label>שם מלא:</Label>
                {/* <Control iconsRight> */}
                <Input
                  dir="rtl"
                  name="fullname"
                  value={fullname}
                  placeholder=" הקלד/י שם משתמש"
                  required
                  color={
                    fullname
                      ? fullnameAvailable
                        ? "success"
                        : "danger"
                      : undefined
                  }
                  type="text"
                  onChange={updateFullName}
                />
              </Field>

              <Field className="phoneLabel">
                <Label>מספר טלפון:</Label>
              </Field>
              <Input
                name="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={updatePhoneNumber}
                className="inputStyle"
                pattern="[0-9]+"
                placeholder="ספרות בלבד"
                required
              />
              <Field className="ageLabel">
                <Label htmlFor="username">שנת לידה:</Label>
              </Field>

              <select
                name="birthYear"
                value={birthYear}
                onChange={updateBirthYear}
                required
                id="year"
                className="inputStyle"
              >
                <option value="0">בחירה</option>
                {generateYearOptions()}
              </select>

              <Field className="phoneLabel">
                <Label>כתובת דואר אלקטרוני</Label>
              </Field>
              <Input
                name="email"
                dir="ltr"
                type="email"
                value={email}
                onChange={updateEmail}
                className="inputStyle"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                placeholder="email@..."
                disabled="disabled"
              />
              <Field className="phoneLabel">
                <Label>סיסמה</Label>
              </Field>

              <Input
                name="password"
                type="password"
                value={password}
                onChange={updatePassword}
                className="inputStyle"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                placeholder="לפחות 8 תווים, לפחות ספרה אחת"
                required
              />

              <Field className="ageLabel">
                <Label htmlFor="username">עיר:</Label>
              </Field>

              <select
                name="mycity"
                value={mycity}
                onChange={updateCity}
                className="inputStyle"
                required
              >
                <option value="">עיר</option>
                {cities.map((cityOption) =>
                  (<option value={cityOption}>{cityOption}</option>))}
              </select>
              <Field className="ageLabel">
                <Label htmlFor="username">חורשה:</Label>
              </Field>

              <select
                name="forest"
                onChange={updateForest}
                className="inputStyle"
                value={forest}
                required
              >
                {forests.map((forestOption) =>
                  (<option value={forestOption._id}>{forestOption.forest_name}</option>))}
              </select>
            </div>
            <label htmlFor="checkbox1">
              <input
                className="formCheck"
                type="checkbox"
                name="acceptedTerms"
                onClick={updateAcceptedTerms}
                checked={acceptedTerms}
                required
              />{" "}
              <span className="spantxt">אשמח לקבל עדכונים על החורשה שלי</span>
            </label>
            <button id="btn-login1" type="submit">
              שמירה
            </button>
          </Box>
        </div>
      </form>
    </PageLayout>
  );
}
