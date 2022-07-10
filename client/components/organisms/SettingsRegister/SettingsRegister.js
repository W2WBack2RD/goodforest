import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import R from "ramda";
import { attemptUpdateUser } from "_thunks/user";
import Field from "react-bulma-companion/lib/Field";
import Input from "react-bulma-companion/lib/Input";
import Label from "react-bulma-companion/lib/Label";

import useKeyPress from "_hooks/useKeyPress";
import PageLayout from "../PageLayout";
import { useSelector } from "react-redux";
import { useForestsAndCities } from "_organisms/Register/Register";

export default function Register() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [email, setEmail] = useState("");
  const [mycity, setMyCity] = useState("");
  const [forest, setForest] = useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const [forests, cities] = useForestsAndCities()

  const resetState = () => {
    setFullname(user.fullName);
    setPhoneNumber(user.phoneNumber);
    setBirthYear(user.birthYear);
    setEmail(user.username);
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
    if (mycity) {
      updatedUser.city = mycity;
    }
    if (forest) {
      updatedUser.forest = forest;
    }
    if (acceptedTerms) {
      updatedUser.get_update = acceptedTerms;
    }

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
      showMenu={forest}
      TreesIcon={true}
      innerPage={true}
      titleStyle={true}
      title="עדכון"
    >
      <form onSubmit={register}>
        <div dir="rtl">
          <div className="register">
            <div id="box1">
              <Field className="userNameLabel">
                <Label>שם מלא:</Label>
                {/* <Control iconsRight> */}
                <Input
                  dir="rtl"
                  name="fullname"
                  value={fullname}
                  className="inputStyle"
                  placeholder="הקלד/י שם משתמש"
                  disabled
                  required
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
                disabled
              />

              <Field className="ageLabel">
                <Label htmlFor="username">עיר:</Label>
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

              <select value={forest} name="forest" onChange={e => setForest(e.target.value)} className="inputStyle" required >
                <option value="">חורשה</option>
                {forests.filter(forest => forest.city?.id === mycity).map((forestOption) =>
                  (<option value={forestOption.id}>{forestOption.forest_name}</option>))}

              </select>
            </div>
            <label htmlFor="checkbox1">
              <input
                className="formCheck"
                type="checkbox"
                name="acceptedTerms"
                onClick={e => setAcceptedTerms(!acceptedTerms)}
                checked={acceptedTerms}
              />{" "}
              <span className="spantxt">אשמח לקבל עדכונים על החורשה שלי</span>
            </label>
            <button id="btn-login1" type="submit">
              שמירה
            </button>
          </div>
        </div>
      </form>
    </PageLayout>
  );
}
